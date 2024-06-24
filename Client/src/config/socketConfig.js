import { io } from 'socket.io-client';
const SOCKET_URL = 'http://localhost:1000';
const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
});

export default socket;
