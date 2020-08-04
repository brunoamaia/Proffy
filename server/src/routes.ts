import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (request, response) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;
    
    // função para verificar se todas as operações podem ser realizadas
    const trx = await db.transaction();
    
    try {
        // 'users' - Tabela que os dados serão inseridos
        // const insetedUsersIds = await db('users').insert({   // Forma "direta" para salvar dados no BD
        const insetedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });
        
        const user_id = insetedUsersIds[0];
        const insetedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,
        });
        
        const class_id = insetedClassesIds[0];
        const classSchedules = schedule.map((scheduleItem: ScheduleItem) => {
            
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })
        await trx('class_schedule').insert(classSchedules);
        
        // Caso todas as operações dêem certo, ele vai fazer todas e terminar sem erro
        await trx.commit();
        
        return response.status(201).send();
    } catch (err) {
        await trx.rollback();
        // console.log(err);
        return response.status(400).json({
            error: 'Unexpected error while creating new class'
        })
    }
});



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