import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { Cliente } from "../models/Cliente.js";

dotenv.config();

export async function loginCliente(req, res) {
  const { email, senha } = req.body;

  const mensagemErroPadrao = {
    id: 0,
    msg: "Erro... Login ou senha incorretos",
  };

  if (!email || !senha) {
    res.status(400).json(mensagemErroPadrao);
    return;
  }

  // verifica se o email está cadastrado
  try {
    const cliente = await Cliente.findOne({ where: { email } });

    if (cliente == null || !bcrypt.compareSync(senha, cliente.senha)) {
      res.status(400).json(mensagemErroPadrao);
      return;
    } else {
      const token = jwt.sign(
        {
          usuario_logado_id: cliente.id, // Corrigido de "cliente.usuario_logado_id" para "cliente.id"
          usuario_logado_nome: cliente.nome, // Corrigido de "cliente.usuario_logado_nome" para "cliente.nome"
          usuario_logado_admin: cliente.admin, // Corrigido de "cliente.usuario_logado_cargo" para "cliente.cargo"
        },
        process.env.JWT_KEY,
        {
          // expiresIn: '24h',
        }
      );
      res.status(200).json({ msg: "Liberado", token, admin: cliente.admin });
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
