// routes/user.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', {
    schema: {
      description: 'Get a list of users',
      tags: ['User'],
      response: {
        200: {
          type: 'array',
          items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } } },
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return [{ id: '1', name: 'John Doe' }];
  });

  // Additional routes for user management (POST, PUT, DELETE)
}
