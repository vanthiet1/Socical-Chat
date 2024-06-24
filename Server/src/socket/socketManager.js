const { Server } = require('socket.io');

let io;

const initIo = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Người dùng kết nối:', socket.id);
   
        socket.on('join', (userId) => {
            console.log(`Người dùng ${userId} đăng nhập`);
            socket.join(userId);
        });
        
        socket.on('sendFriendRequest', ({ username , toUserId  }) => {
            io.to(toUserId).emit('friendRequestReceived', {username});
        });

        socket.on('disconnect', () => {
            console.log('Người dùng đã ngắt kết nối:', socket.id);
        });
    });

};

const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized. Call initIo first.");
    }
    return io;
};

module.exports = {
    initIo,
    getIo
};
