import express from 'express';   //ESM EcmaScript Module
import 'dotenv/config'
import router from './router';
import { connectDB } from './config/db';

const app = express();

//Leer datos del form
app.use(express.json()); // Middleware para parsear JSON

connectDB()

app.use('/', router)

export default app;