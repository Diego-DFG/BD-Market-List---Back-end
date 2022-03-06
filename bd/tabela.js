class Tabela {
    init(conexao) {
        this.conexao = conexao;

        this.criaTabelaLista();
        this.criaTabelaUsuarios();
    }

    criaTabelaLista() {
        const sql = `CREATE TABLE IF NOT EXISTS listadecompras (
            id int NOT NULL AUTO_INCREMENT, produto varchar(100) NOT NULL,
            quantidade varchar(50) NOT NULL, dataCriacao datetime NOT NULL, PRIMARY KEY(id) 
        )`;

        this.conexao.query(sql, (erro)=> {
            if(erro) {
                console.log('Erro ao criar tabela.');
            } else {
                console.log('Tabela ListaDeCompras criada!');
            }
        })
    }
    
    criaTabelaUsuarios() {
        const sql = `CREATE TABLE IF NOT EXISTS usuarios (
            id int NOT NULL AUTO_INCREMENT, usuario varchar(50) NOT NULL,
            email varchar(200) NOT NULL, senha VARCHAR(100) NOT NULL, PRIMARY KEY(id) 
        )`;

        this.conexao.query(sql, (erro)=> {
            if(erro) {
                console.log('Erro ao criar tabela.');
            } else {
                console.log('Tabela usuarios criada!');
            }
        })
    }

}
module.exports = new Tabela;