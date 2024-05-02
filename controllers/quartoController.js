import { Op } from "sequelize";
import { Quarto } from "../models/Quarto.js";
import { Comentario } from "../models/Comentario.js";
import { Avaliacao } from "../models/Avaliacao.js";

export async function quartoIndex(req, res) {
  try {
    const quartos = await Quarto.findAll({
      include: [{ model: Comentario }, { model: Avaliacao }],
    });

    // Itera sobre cada quarto
    for (const quarto of quartos) {
      let totalNotas = 0;
      let quantidadeAvaliacoes = 0;

      // Calcula a soma total das notas das avaliações do quarto
      for (const avaliacao of quarto.avaliacaos) {
        totalNotas += avaliacao.nota;
        quantidadeAvaliacoes++;
      }

      // Calcula a média das notas
      const media = quantidadeAvaliacoes > 0 ? totalNotas / quantidadeAvaliacoes : null;

      // Formata a média para um número com uma casa decimal
      quarto.media = media !== null ? media.toFixed(1) : null;
    }

    res.status(200).json(quartos);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function quartoCreate(req, res) {
  const { titulo, preco, foto } = req.body;

  if (!titulo || !preco || !foto) {
    res.status(400).json("Erro... Informe titulo, preco, foto do quarto");
    return;
  }

  try {
    const quarto = await Quarto.create({
      titulo,
      preco,
      foto,
    });
    res.status(201).json(quarto);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function quartoUpdate(req, res) {
  const { id } = req.params;

  const { titulo, preco, foto } = req.body;

  if (!titulo || !preco || !foto) {
    res.status(400).json("Erro... Informe titulo, preco, foto do quarto");
    return;
  }

  try {
    const quarto = await Quarto.update(
      {
        titulo,
        preco,
        foto,
      },
      {
        where: { id },
      }
    );
    res.status(200).json(quarto);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function quartoDelete(req, res) {
  const { id } = req.params;

  try {
    await Quarto.destroy({
      where: { id },
    });
    res.status(200).json({ msg: "Ok! quarto removido com sucesso" });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function quartoById(req, res) {
  const { id } = req.params;

  try {
    const quarto = await Quarto.findByPk(id, {
      include: [{ model: Comentario }, { model: Avaliacao }]
    });
    res.status(200).json(quarto);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function quartoPesquisa(req, res) {
  const { palavra } = req.params;

  try {
    const quartos = await Quarto.findAll({
      where: {
        titulo: {
          [Op.like]: "%" + palavra + "%",
        },
      },
      order: [["id", "desc"]],
    });
    res.status(200).json(quartos);
  } catch (error) {
    res.status(400).send(error);
  }
}
