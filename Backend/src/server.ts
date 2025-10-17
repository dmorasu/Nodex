import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import { db } from './config/db'
import usuarioRouter from "./routes/usuarioRouter"
import entidadRouter from "./routes/entidadRouter"
import clienteRouter from "./routes/clienteRouter"
import municipiosRouter from "./routes/municipiosRouter"
import operacionesRouter from "./routes/operacionesRouter" 
import tarifaRouter from "./routes/tarifaRouter" 
import tramitadorRouter from "./routes/tramitadorRouter" 
import solicitudTramiteRouter from  "./routes/solicitudTramiteRouter"
import estadosRouter from './routes/estadosRouter'
import authRouter from './routes/authRouter'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexion Exitosa'));
        
    } catch (error) {
        console.log(colors.red.bold('Fallo la Conexion a la base de Datos'))
        
    }
    
}

connectDB()
const app = express()

app.use(morgan('dev'))

app.use(cors({
  origin: 'http://localhost:3000',  // dominio del frontend
  credentials: true,                // si usas cookies o auth headers
}))

app.use(express.json())

app.use('/api/usuarios', usuarioRouter)

app.use('/api/entidad',entidadRouter)

app.use('/api/clientes', clienteRouter)

app.use('/api/municipios', municipiosRouter)

app.use('/api/operaciones',operacionesRouter)

app.use('/api/tarifa',tarifaRouter)

app.use('/api/tramitador',tramitadorRouter)

app.use('/api/solicitudTramites',solicitudTramiteRouter)

app.use('/api/estados',estadosRouter)

app.use('/api/auth',authRouter)

export default app