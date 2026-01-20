import colors from 'colors'
import server from './server'

const port = Number(process.env.PORT )|| 4000

server.listen(port,'0.0.0.0', () => {
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))
})