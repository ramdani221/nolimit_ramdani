module.exports = {
    openapi: "3.0.0",
    info: {
        title: "BE Test API Documentation",
        version: "1.0.0",
        description: "This is the API documentation for our application."
    },
    servers: [
        {
            url: process.env.DOMAIN_ADDRESS,
            description: "Local server"
        }
    ],
    paths: {}
} 