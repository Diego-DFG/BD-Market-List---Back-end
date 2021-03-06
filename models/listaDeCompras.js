const conexao = require('../bd/conexao');
const aUsuarios = [
	{
		"id": 6,
		"usuario": "Diego",
		"email": "diegofgomes19@gmail.com",
		"senha": "$2b$12$YQ56ph.XnjqtvxekUU6Mau6yDUH66/sjBNDI6x4pM/1xSiXTzGhom"
	},
	{
		"id": 7,
		"usuario": "Beatriz",
		"email": "beatriz3s@hotmail.com",
		"senha": "$2b$12$UGppSJLdvhjDPnJYz5K.7el5GjN6EDkv7poQ/J/TZty1wiC5PU.Ry"
	}
];
const arraySelecionado = [];

class ListaDeCompras {

    /*retornaUsuarios(res) {
        const sql = `SELECT * FROM usuarios`;

        conexao.query(sql, (erro, resultado)=> {
            if(erro) {
                res.status(400).json(erro);
            } else {
                arrayUsuarios.push(resultado);
                res.status(200).json(resultado);
            }
        })
    }*/

    retornaPorUsuario(user, res) {
        const sql = `SELECT * FROM usuarios WHERE usuario=?`;

        conexao.query(sql, user, (erro, resultado)=> {
                if(erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                } else {
                    return resultado;
                }
            
        });
    }

    criaUsuario(valores, res) {
        const sql = `INSERT INTO usuarios set ?`;

        conexao.query(sql, valores, (erro, resultado)=> {
            if(erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    apagaUsuario(id, res) {
        const sql = `DELETE FROM usuarios WHERE id=?`;

        conexao.query(sql, id,(erro, resultado)=> {
            if(erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    atualizaUsuario(id, valores, res) {
        const sql = `UPDATE usuarios SET ? WHERE id=?`;

        conexao.query(sql, [valores, id],(erro, resultado)=> {
            if(erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    retornaLista(res) {
        const sql = `SELECT * FROM listadecompras`;

        conexao.query(sql, (erro, resultado)=> {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        })
    }

    retornaListaPorId(id, res) {
        const sql = `SELECT * FROM listadecompras WHERE id=${id}`;

        conexao.query(sql, (erro, resultado)=> {
            if(erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    criaLista(valores, res) {
        const sql = `INSERT INTO listadecompras set ?`;

        const dataCriacao = new Date();
        const produtoDatado = {...valores, dataCriacao}

        conexao.query(sql, produtoDatado, (erro, resultado)=> {
            if(erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    atualizaLista(id, res) {
        const sql = `UPDATE FROM listadecompras WHERE id=?`;

        conexao.query(sql, id,(erro, resultado)=> {
            if(erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    apagaLista(id, res) {
        const sql = `DELETE FROM listadecompras WHERE id=?`;

        conexao.query(sql, id,(erro, resultado)=> {
            if(erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }


    retornaArrayUsuarios(usuario) {

                console.log('OBJETO USU??RIO: '+usuario);
                
                aUsuarios.map(objs => {
                    console.log('USUARIO BD: '+objs);
                    if(objs.usuario.includes(usuario)) {
                    arraySelecionado[0] = objs;
                    }
                });

        return arraySelecionado[0];
    }
}
module.exports = new ListaDeCompras;