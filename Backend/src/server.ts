import express from 'express';   //ESM EcmaScript Module
import cors from 'cors'
import 'dotenv/config'
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

connectDB()
 
const app = express();
// Cors 
app.use(cors(corsConfig))

// Leer datos del form
app.use(express.json()); // Middleware para parsear JSON

app.use('/', router)


export default app;