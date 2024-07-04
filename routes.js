import { Router } from "express"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { loginCliente } from "./controllers/loginController.js"
import { quartoById, quartoCreate, quartoDelete, quartoIndex, quartoPesquisa, quartoUpdate } from "./controllers/quartoController.js"
import { comentarioCreate, comentarioDelete, comentarioIndex } from "./controllers/comentarioController.js"
import { verificaToken } from "./middlewares/verificaToken.js"
import { avaliacaoCreate } from "./controllers/avaliacaoController.js"

const router = Router()

router.get("/quarto", quartoIndex)
      .post("/quarto", quartoCreate)
      .put("/quarto/:id", quartoUpdate)
      .delete("/quarto/:id", quartoDelete)
      .get("/quarto/:id",quartoById)
      .get("/quarto/pesquisa/:palavra", quartoPesquisa)

router.get("/clientes", clienteIndex)
      .post("/clientes", clienteCreate)
      
router.get('/comentarios', comentarioIndex)
      .post('/comentarios', comentarioCreate)
      .delete('/comentarios/:id', comentarioDelete)

router.post('/avaliar', avaliacaoCreate)

router.post("/login", loginCliente)

export default router