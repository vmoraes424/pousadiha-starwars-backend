import express from 'express'
import cors from "cors"
import { sequelize } from './database/conecta.js'
import { Cliente } from './models/Cliente.js'
import routes from './routes.js'
import { Quarto } from './models/Quarto.js'
import { Comentario } from './models/Comentario.js'
import { Avaliacao } from './models/Avaliacao.js'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Pousadinha do Starwars')
})

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com Banco de Dados realizada com Sucesso');
    // await Filme.sync({alter: true})      // cria a tabela no banco (se não existir)
    await Quarto.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Quartos: Ok")
    await Cliente.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Clientes: Ok")
    await Comentario.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Clientes: Ok")
    await Avaliacao.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Avaliacao: Ok")
  } catch (error) {
    console.error('Erro ao conectar o banco de dados:', error);
  }  
}
conecta_db()

app.listen(port, () => {
  console.log(`API da Pousadinha do Starwars Rodando na Porta: ${port}`)
})