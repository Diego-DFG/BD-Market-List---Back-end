require('dotenv').config();
const express = require('express');
const rotas = require('./routes/rotas');
const conexao = require('./bd/conexao');
const tabela = require('./bd/tabela');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const url_prod = "https://diego-dfg.github.io";
const url_dev = "http://localhost:3001"

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: url_prod}));
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



