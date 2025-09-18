import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import solicitanteRouter from "./routes/solicitanteRouter"

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

app.use(express.json())

app.use('/api/solicitantes', solicitanteRouter)



export default app