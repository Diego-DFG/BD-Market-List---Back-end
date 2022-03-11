require('dotenv').config();
const express = require('express');
const conexao = require('./bd/conexao');
const tabela = require('./bd/tabela');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://diego-dfg.github.io/BD-Market-List/#/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



  /*app.use(
    cors({
      credentials: true,
      origin: true,
      
    })
  );*/
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
const rotas = require('./routes/rotas');
app.use('/', rotas);

conexao.connect((erro)=> {
    if(erro) {
        console.log('Erro ao se conectar com o banco!');
        console.log(erro);
    } else {
        console.log('Conexão com o banco estabelecida!');

        tabela.init(conexao);

        const port = process.env.PORT || 3000;

        app.listen(port, ()=> console.log('Servidor operando na porta 3000!'));
    }
})



