import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/routesPoliciais.js'
dotenv.config()


const app = express()
app.use(cors({
    origin: '*', // Domínio do Angular http://localhost:4200
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use('/api/auth', router)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`)
})