import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api/tasks', taskRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'Server OK' });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});