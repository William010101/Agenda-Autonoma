const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',          // substitua com seu usuário do PostgreSQL
  host: 'localhost',            // substitua se o banco estiver em outro host
  database: 'postgres',        // nome do banco de dados
  password: 'masterkey',        // senha do usuário
  port: 5432,                   // porta do PostgreSQL
});

// Rota para buscar uma pergunta pelo ID
app.get('/pergunta/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM pergunta WHERE fk_id_categoria = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pergunta não encontrada' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a pergunta' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('vai toma no cu Mundo!')
// })

// app.listen(port, () => {
//   console.log(`Exemplo de app rodando em http://localhost:${port}`)
// })