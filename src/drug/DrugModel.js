const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');
const config = require('../../config');

const Drug = SequelizeInstance.define('Drug', {
  drugId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  manufacturer: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  nonGenericParentId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
  },
  federalDrugIdentifier: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: Sequelize.DataTypes.STRING,
    values: activeEnum,
  },
});

module.exports = Drug;