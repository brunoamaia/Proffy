import express from 'express';

const app = express();
app.use(express.json());    // Permite que o expresse interprete arquivos .json



/*
GET: Buscar ou listar uma informação
POST: Criar alguma nova informação
PUT: Atualizar uma informação existente
Delete: Deletar alguma informação existente

CORPO (Request Body): Dados para criação ou atualização de um registro
Route Params: identificar quala recurso eu quero atualizar ou deletar
Query Params: Parametros passados com a rota (paginação. filtros, ordenação)
*/

app.get('/', (request, response) => {
    return response.json({ message: 'Hello World'})
})

app.listen(3333);   // "Escuta" as requisições Http, na porta 3333
