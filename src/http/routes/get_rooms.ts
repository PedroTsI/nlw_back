import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import {schema} from "../../db/schema/index.ts";
import {db} from "../../db/connection.ts";
export const getRoomsRoute: FastifyPluginCallbackZod = (app) =>{
    app.get('/rooms', async (ctx) => {
        const results = await db
            .select({
                id: schema.rooms.id,
                name: schema.rooms.name,
            })
            .from(schema.rooms)
            .orderBy(schema.rooms.created_at)

        return results
    })
}
