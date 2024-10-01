import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import connect from './database/connection';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', (req, res) => res.send('API funcionando!'));

async function startServer() {
  try {
    // Iniciar a conexão com o banco de dados
    await connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Iniciar o servidor
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

// Chamar a função para iniciar o servidor
startServer();
