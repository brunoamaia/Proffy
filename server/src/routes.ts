import express from 'express';
import ClassController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassController();
const connectionController = new ConnectionsController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionController.index)
routes.post('/connections', connectionController.create)

export default routes;

/*
GET: Buscar ou listar uma informação
POST: Criar alguma nova informação
PUT: Atualizar uma informação existente
Delete: Deletar alguma informação existente

CORPO (Request Body): Dados para criação ou atualização de um registro
Route Params: identificar quala recurso eu quero atualizar ou deletar
Query Params: Parametros passados com a rota (paginação. filtros, ordenação)
*/