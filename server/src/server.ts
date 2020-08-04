import express from 'express';
import routes from './routes';  // Arquivo que gerencia as rotas

const app = express();
app.use(express.json());    // Permite que o express interprete arquivos .json

app.use(routes);

app.listen(3333);   // "Escuta" as requisições Http, na porta 3333
