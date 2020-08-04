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

app.get('/users', (request, response) => {
    const users = [
        {name: 'Fulano', age: 25},
        {name: 'Ciclano', age: 22},
    ];
    
    return response.json(users)
})

app.listen(3333);   // "Escuta" as requisições Http, na porta 3333
