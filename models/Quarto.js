import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';
import { Comentario } from './Comentario.js';

export const Quarto = sequelize.define('quarto', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  preco: {
    type: DataTypes.INTEGER(),
    allowNull: false    
  },
  foto: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  media: {
    type: DataTypes.INTEGER(),
    allowNull: true
  }
});

Quarto.hasMany(Comentario, { foreignKey: 'quarto_id', allowNull: false });
Comentario.belongsTo(Quarto, { foreignKey: 'quarto_id', allowNull: false});