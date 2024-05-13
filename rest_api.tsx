// src/resources/user.entity.ts
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Add other user properties here
}

// src/resources/user.routes.ts
import * as fastify from 'fastify'
import {User} from './user.entity'

const routes: fastify.RouteOptions[] = [
  {
    method: 'GET',
    url: '/users',
    handler: async (request, reply) => {
      // Fetch and return users
    }
  },
  {
    method: 'POST',
    url: '/users',
    handler: async (request, reply) => {
      // Create a new user
    }
  }
  // Add other routes as needed
]

export default routes

// src/plugins/auth.plugin.ts
import * as fastify from 'fastify'
import * as jwt from 'jsonwebtoken'

export default function(fastify: fastify.FastifyInstance, opts: any, next: any) {
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
  next()
}

// src/index.ts
import * as fastify from 'fastify'
import auth from './plugins/auth.plugin'
import userRoutes from './resources/user.routes'

const server: fastify.FastifyInstance = fastify({})

server.register(auth)
userRoutes.forEach((route) => server.route(route))

const start = async () => {
  try {
    await server.listen(3000)
    server.log.info(`server listening on ${server.server.address().port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
