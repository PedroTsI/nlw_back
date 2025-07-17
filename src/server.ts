import {fastify} from "fastify";
import {serializerCompiler, validatorCompiler, type ZodTypeProvider} from "fastify-type-provider-zod";
import {fastifyCors} from "@fastify/cors";
import {env} from './env.ts'
import {getRoomsRoute} from "./http/routes/get_rooms.ts";
import { createRoomRoute } from "./http/routes/create_room.ts";
import { getRoomQuestions } from "./http/routes/get_room_question.ts";
import { createQuestionRoute } from "./http/routes/create_questions.ts";
import { uploadAudioRoute } from "./http/routes/upload_audio.ts";
import fastifyMultipart from "@fastify/multipart";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: "*"
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyMultipart)

app.get('/health', ()=>{
    return 'OK'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestions)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)

app.listen({port: env.PORT})