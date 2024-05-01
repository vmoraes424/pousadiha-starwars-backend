import { DataTypes } from "sequelize";
import { sequelize } from "../database/conecta.js";
import { Quarto } from "./Quarto.js";
import { Cliente } from "./Cliente.js";

export const Avaliacao = sequelize.define("avaliacao", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nota: {
    type: DataTypes.INTEGER,
    min: 1,
    max: 5,
    allowNull: false,
  },
});

Avaliacao.belongsTo(Quarto, { foreignKey: "quarto_id", allowNull: false });
Quarto.hasMany(Avaliacao, { foreignKey: "quarto_id", allowNull: false});
Cliente.hasOne(Avaliacao, { foreignKey: "cliente_id", allowNull: false });
Avaliacao.belongsTo(Cliente, { foreignKey: "cliente_id", allowNull: false });
