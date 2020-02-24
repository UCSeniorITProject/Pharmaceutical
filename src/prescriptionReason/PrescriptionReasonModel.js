const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');

const PrescriptionReason = SequelizeInstance.define('PrescriptionReason', {
  prescriptionReasonId: {
    type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
  },
  shortSummary: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  reasonCode:  {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  longSummary: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    values: activeEnum,
  },
});

module.exports = PrescriptionReason;
