import Fastify from 'fastify';
import swagger from 'fastify-swagger';
import { userRoutes } from './routes/user';

const fastify = Fastify();

// Swagger options
fastify.register(swagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'User API',
      description: 'API for managing user accounts',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
});

// Register routes
fastify.register(userRoutes);

// Start the server
fastify.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server listening on http://localhost:3000');
});
