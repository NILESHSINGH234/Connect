const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postRouter');

// Load environment variables from .env file
dotenv.config();

// Initialize database connection
dbConnect();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('common'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

// Route Handlers
app.use('/auth', authRouter);
app.use('/posts', postRouter);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App is started on port ${PORT}`);
});
