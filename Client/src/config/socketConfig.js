import { io } from 'socket.io-client';
// const SOCKET_URL = 'http://localhost:1000';
const SOCKET_URL = 'https://socical-chat.onrender.com';

const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
});

export default socket;
