const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');
const config = require('../../config');

const PrescriptionPrescribableDrug = SequelizeInstance.define('PrescriptionPrescribableDrug', {
  prescriptionPrescribableDrugId:  {
    type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
  },
  prescriptionId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  prescribableId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: Sequelize.DataTypes.STRING,
    values: activeEnum,
  }
});

PrescriptionPrescribableDrug.sync({force: config.db.forceTableCreation});

module.exports = PrescriptionPrescribableDrug;