const Hapi = require('@hapi/hapi');
const client = require('prom-client');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Initialize Prometheus Client to collect default metrics
    client.collectDefaultMetrics();

    // Define a custom counter metric
    const customCounter = new client.Counter({
        name: 'custom_counter',
        help: 'Custom metric example'
    });

    // Prometheus metrics endpoint
    server.route({
        method: 'GET',
        path: '/metrics',
        handler: async (request, h) => {
            // Example of updating the custom metric
            customCounter.inc();

            return h.response(await client.register.metrics())
                     .header('Content-Type', client.register.contentType);
        }
    });

    // Define a custom counter metric
    const rootCounter = new client.Counter({
        name: 'root_counter',
        help: 'Root metric example'
    });

    // Prometheus metrics endpoint
    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            // Example of updating the custom metric
            rootCounter.inc();

            return {pee:"Poo"}
            // return h.response(await client.register.metrics())
            //          .header('Content-Type', client.register.contentType);
        }
    });

    // Additional routes for your application
    // ...

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
