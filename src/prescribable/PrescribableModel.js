const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');
const config = require('../../config');

const Prescribable = SequelizeInstance.define('Prescribable',  {
  prescribableId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dosage: {
    type: Sequelize.DataTypes.DECIMAL,
    allowNull: false,
  },
  dosageUnit: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  dosageFrequency: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  drugId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Drugs',
      key: 'drugId',
    },
  },
  minWeight: {
    type: Sequelize.DataTypes.DECIMAL,
    allowNull: false,
  },
  requiredGender: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    values: ['M', 'F'],
  },
  active: {
    type: Sequelize.DataTypes.STRING,
    values: activeEnum,
  },
});


module.exports = Prescribable;