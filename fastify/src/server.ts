import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hallo', async (request, reply) => {
  const test = await knex('sqlite_schema').select('*')
  reply.send({ test })
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server Running!!!'))
