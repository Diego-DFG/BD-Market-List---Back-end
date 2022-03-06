const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.DB_SENHA,
    database:process.env.DATA_BASE
});
module.exports = conexao;