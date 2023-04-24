import express from 'express';
import * as dotenv from 'dotenv';
import connectDatabase from './database/connection.js';
import User from './models/User.js';
import userRouter from './routes/user.js';



// Application Configurations
const app = express();
dotenv.config();
app.use(express.json());


// Test Server
app.get('/', (req, res) => {
    res.send('Hello!😊 from the server');
});


// Routes Section

app.use('/api/user', userRouter)





// Database Connection
const PORT = process.env.PORT || 8000;
const startServer = async () => {
    try {
        await connectDatabase(process.env.MONGO_URL);
        app.listen(PORT, console.log(`Server Started! http://localhost:${PORT}/`));
    } catch (error) {
        console.log(error);
    }
}
startServer();