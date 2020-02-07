const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');

const Pharmacy = SequelizeInstance.define('Pharmacy', {
	pharmacyId: {
		type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
	},
	address: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	zipCode: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	state: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	active: {
    type: Sequelize.DataTypes.STRING,
		values: activeEnum,
		allowNull: false,
  },
});

module.exports = Pharmacy;