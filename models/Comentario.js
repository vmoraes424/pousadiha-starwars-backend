import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Comentario = sequelize.define('comentario', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  comentario: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  usuarioLogado: {
    type: DataTypes.STRING(),
    allowNull: false
  }
})