require('dotenv').config();
const rotas = require('express').Router();
const ListaDeCompras = require('../models/listaDeCompras');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const arrayUsuarioAutenticado = [];

const url_prod = "https://diego-dfg.github.io";
const url_auth_dev = "http://localhost:3001";

passport.use(new LocalStrategy(
  {
    usernameField: 'usuario',
    passwordField: 'senha',
    session: false
  }, async (usuario, senha, done)=>{
    try {
      const user = ListaDeCompras.retornaArrayUsuarios(usuario);
      const objetoUsuario = user;
      
      
     const senhaDecodificada = await bcrypt.compare(senha, objetoUsuario.senha);

      if(senhaDecodificada !== true || usuario !== objetoUsuario.usuario) {
        throw new Error('Dados inconsistentes!');
      } else {
        console.log('Inicia área de autenticação ...');
        console.log('Finaliza área de autenticação ...');
      }

      arrayUsuarioAutenticado.push(objetoUsuario);

      done(null, usuario);

    } catch (error) {
      done(error);
    }
  }
));

function verificaToken(req, res, next) {
  const tokenVerificado = req.cookies.userToken;
  console.log(req.cookies);
  console.log(tokenVerificado);
  if(!tokenVerificado) {
    res.status(403).send('É necessário token para atenticação!');
  }

  const decoded = jwt.verify(tokenVerificado, process.env.CHAVE_JWT);
  console.log(decoded);
 next();
}


/** Rotas para Autenticação e Login **/
rotas.post("/auth", passport.authenticate('local', {session: false}), async (req, res) => {
  console.log('Acessei a rota Auth');
    const usuarioAutenticado = arrayUsuarioAutenticado[0];
    const payload = {id: usuarioAutenticado.id};
    const options = { secure: true, sameSite: 'none', httpOnly: true}; 
    const token = jwt.sign(payload.id, process.env.CHAVE_JWT);

    res.setHeader("Access-Control-Allow-Origin",url_prod)
    res.cookie("userToken", token, options);
    res.sendStatus(204);
  });
  
  rotas.get("/logout", async (req, res) => {
    res.clearCookie("userToken");
    req.logout();
    return res.sendStatus(200);
  });



/** Rotas dos usuarios  **/

/*rotas.get('/usuarios', async (req, res)=> {
  res.setHeader({"Allow-Access-Control-Origin": "https://diego-dfg.github.io/BD-Market-List/#/"})
    await ListaDeCompras.retornaUsuarios(res);
});*/

rotas.get('/usuarios/:id', async (req, res)=> {
  const id = parseInt(req.params.id);
  await ListaDeCompras.retornaUsuarioPorId(id, res);
});

rotas.delete('/apagaUsuario/:id', async (req, res)=> {
  const id = parseInt(req.params.id);
  console.log(id);
  await ListaDeCompras.apagaUsuario(id, res);
});

rotas.patch('/atualizaUsuario/:id', async (req, res)=> {
  const id = parseInt(req.params.id);
  const senhaHash = await bcrypt.hash(req.body.senha, 12);
  let valores = req.body;
  valores.senha = senhaHash;
  await ListaDeCompras.atualizaUsuario(id, valores, res);
});



/** Rotas da lista de compras **/
rotas.get('/', verificaToken, async (req, res)=> {
  console.log('Acessei lista de compras!');
  res.setHeader("Access-Control-Allow-Origin",url_prod)
   await ListaDeCompras.retornaLista(res);
});

rotas.get('/:id', async (req, res)=> {
    const id = parseInt(req.params.id);
    await ListaDeCompras.retornaListaPorId(id, res);
});

rotas.post('/cria', async (req, res)=> {
    console.log(req.body);
    const valores = req.body;
    await ListaDeCompras.criaLista(valores, res);
});

rotas.put('/cria_usuario', async (req, res)=> {
  console.log(req.body);
  const valores = req.body;
  await ListaDeCompras.criaUsuario(valores, res);
});

rotas.patch('/atualiza/:id', async (req, res)=> {
    const id = parseInt(req.params.id);
    const valores = req.body;
    await ListaDeCompras.atualizaLista(id, valores, res);
});

rotas.delete('/apaga', async (req, res)=> {
    const id = parseInt(req.body.id);
    console.log(id);
    await ListaDeCompras.apagaLista(id, res);
});
module.exports = rotas;
