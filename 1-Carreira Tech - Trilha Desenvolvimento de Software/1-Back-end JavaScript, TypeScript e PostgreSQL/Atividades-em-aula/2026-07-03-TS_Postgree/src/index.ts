import { pool} from './config/db';
import {bucarTodosAlunos, buscarAlunoPorEmail, criarAluno} from './repositories/alunoRepository'

    // console.log("pool");
    // console.log(pool);

// console.log( bucarTodosAlunos());
// console.log( buscarAlunoPorEmail('rodrigo@rodrigo.com'));
console.log(criarAluno('Carla', 'Carla', 'ing'))
// testarConexao();
async function testarConexao() {
    try {
        const resultado = await pool.query('SELECT NOW();');
        console.log('🎉 Conexão com o banco realizada com sucesso!');
        console.log('📅 Data e Hora do Banco:', resultado.rows[0].now);

    } catch (erro) {
        console.error('❌ Erro ao conectar no banco de dados:', erro);
    } finally {
        // Fecha o pool para o Node não ficar "preso" rodando no terminal
        await pool.end();
    }
}


