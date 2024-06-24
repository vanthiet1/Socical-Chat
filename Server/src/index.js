const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/connectDB');
const http = require('http');
const { initIo } = require('./socket/socketManager'); 

const app = express();
const server = http.createServer(app); 

// Middleware
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
connectDB();

// Initialize Socket.IO
initIo(server);

// Routes
const userRouter = require('./routers/userRouter');
const searchRouter = require('./routers/searchRouter');

app.use('/api/v1', userRouter); 
app.use('/api/v1', searchRouter); 

// Default route
app.get('/', (req, res) => {
    res.send("Welcome To Api");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
