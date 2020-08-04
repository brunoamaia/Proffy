import { Request, Response } from 'express';
import db from "../database/connection";
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassController {
    // Listar as aulas
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const time = filters.time as string;
        const week_day = filters.week_day as string;

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);
        const classes  = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')   // pega na "class_schedule" quem tem o "class_id" igual o "id" da "classes"
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) // Verifica o Dia // ("??") passar o parametro [week_day] para busacar na "class_schedule"
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) // Professor tem disponibilidade antes ou na Hora selecionada
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])    // Encerramento do horário
            })
            .where('classes.subject', '=', subject)             // Verificar disciplina
            .join('users', 'classes.user_id', '=', 'users.id')  // "insere" os dados do Professor
            .select(['classes.*', 'users.*']);                  // seleciona o professor

        return response.json(classes);
    }

    // Slavar o horário de disponibilidade do Professor
    async create(request: Request, response: Response) {
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
    }
}