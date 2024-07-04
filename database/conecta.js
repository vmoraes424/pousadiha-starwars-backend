import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  'pousada_starwars', 'root', 'senacrs', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});