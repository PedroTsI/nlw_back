import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import {schema} from "../../db/schema/index.ts";
import {db} from "../../db/connection.ts";
import z from 'zod/v4';
import { eq } from 'drizzle-orm';
import { questions } from '../../db/schema/questions.ts';

export const getRoomQuestions: FastifyPluginCallbackZod = (app) =>{
    app.get('/rooms/:roomId/questions', {
        schema:{
            params: z.object({
                roomId: z.string(),
            })
        }
    },
    async (request) => {
        const {roomId} = request.params

        console.log(roomId)

        const result = await db
        .select({
            id: schema.questions.id,
            questions: schema.questions.question,
            answer: schema.questions.answer,
            createdAt: schema.questions.created_at
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(schema.questions.created_at)

        return result
    })
}
