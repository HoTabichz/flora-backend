const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Bouquet = sequelize.define('Bouquet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  photoURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'bouquets',
  timestamps: true,
});

module.exports = Bouquet;
