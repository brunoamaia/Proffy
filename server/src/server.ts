import express from 'express';
import routes from './routes';  // Arquivo que gerencia as rotas
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());    // Permite que o express interprete arquivos .json
app.use(routes);

app.listen(3333);   // "Escuta" as requisições Http, na porta 3333
