import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './database/data-source';

const app = express();
const PORT = process.env.PORT || '3000';

app.use(express.json());

// Rota de teste inicial da Etapa 1
app.get('/api', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API MedClinic funcionando com Express 5 e banco de dados conectado!'
  });
});

// Inicializa a conexão com o PostgreSQL através do TypeORM
AppDataSource.initialize()
    .then(() => {
      console.log('[banco]: Conexão com o PostgreSQL estabelecida com sucesso!');

      // Inicia o servidor HTTP apenas após a conexão bem-sucedida com o banco
      app.listen(PORT, () => {
        console.log(`[servidor]: Aplicação rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('[banco]: Erro fatal durante a inicialização do DataSource:', error);
    });