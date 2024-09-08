const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const noteSocketHandler = require('./sockets/noteSocket');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

noteSocketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});