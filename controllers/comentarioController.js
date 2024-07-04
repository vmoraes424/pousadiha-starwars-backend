import { Comentario } from "../models/Comentario.js"

export async function comentarioIndex(req, res) {
  try {
    const comentarios = await Comentario.findAll()
    res.status(200).json(comentarios)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function comentarioCreate(req, res) {
  const { comentario, quarto_id } = req.body

  if (!comentario || !quarto_id) {
    res.status(400).json("Erro... Informe comentario e quarto_id do quarto")
    return
  }

  try {
    const comentariodoneymar = await Comentario.create({
      comentario, quarto_id
    })
    res.status(201).json(comentariodoneymar)
  } catch (error) {
    res.status(400).send(error)
  }
}
export async function comentarioDelete(req, res) {

  const { id } = req.params

  try {
    await Comentario.destroy({
      where: { id }
    })
    res.status(200).json({ msg: "Ok! quarto removido com sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}
