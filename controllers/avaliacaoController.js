import { Avaliacao } from "../models/Avaliacao.js";

export async function avaliacaoCreate(req, res) {
  const userId = req.usuario_logado_id;
  const { nota, quarto_id } = req.body;

  if (!nota || !quarto_id) {
    res.status(400).json("Erro... Informe a nota e o quarto_id");
    return;
  }

  try {
    const notaCliente = await Avaliacao.create({
      cliente_id: userId, nota, quarto_id
    });
    console.log('notaCliente', notaCliente)
    res.status(201).json(notaCliente);
  } catch (error) {
    res.status(400).send(error);
  }
}
