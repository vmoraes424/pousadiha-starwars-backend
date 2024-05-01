import { Router } from "express"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { loginCliente } from "./controllers/loginController.js"
import { quartoById, quartoCreate, quartoDelete, quartoIndex, quartoPesquisa, quartoUpdate } from "./controllers/quartoController.js"
import { comentarioCreate, comentarioDelete, comentarioIndex } from "./controllers/comentarioController.js"
import { verificaToken } from "./middlewares/verificaToken.js"
import { avaliacaoCreate } from "./controllers/avaliacaoController.js"

const router = Router()

router.get("/quarto", verificaToken, quartoIndex)
      .post("/quarto", verificaToken, quartoCreate)
      .put("/quarto/:id", verificaToken, quartoUpdate)
      .delete("/quarto/:id", verificaToken, quartoDelete)
      .get("/quarto/:id", verificaToken,quartoById)
      .get("/quarto/pesquisa/:palavra", verificaToken, quartoPesquisa)

router.get("/clientes", clienteIndex)
      .post("/clientes", clienteCreate)
      
router.get('/comentarios', verificaToken, comentarioIndex)
      .post('/comentarios', verificaToken, comentarioCreate)
      .delete('/comentarios/:id', comentarioDelete)

router.post('/avaliar', verificaToken, avaliacaoCreate)

router.post("/login", loginCliente)

export default router