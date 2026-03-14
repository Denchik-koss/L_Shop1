import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', testRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Все добра' });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', time: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});