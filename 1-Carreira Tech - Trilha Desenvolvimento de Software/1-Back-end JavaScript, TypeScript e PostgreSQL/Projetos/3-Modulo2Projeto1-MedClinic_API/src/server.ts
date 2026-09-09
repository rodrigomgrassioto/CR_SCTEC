import express from 'express';

const app = express();
const PORT = process.env.PORT || '3000';

app.use(express.json());

// Rota inicial de teste (usando _req para evitar erro de variável não utilizada)
app.get('/api', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ 
    success: true,
    message: 'API MedClinic funcionando com Express 5!' 
  });
});

app.listen(PORT, () => {
  console.log(`[servidor]: Aplicação rodando na porta ${PORT}`);
});