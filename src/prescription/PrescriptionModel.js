const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');
const config = require('../../config');

const Prescription = SequelizeInstance.define('Prescription',{
	prescriptionId: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	patientId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'Patient',
			key: 'PatientId',
		},
	},
	pharmacyId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
	},
	doctorId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
	},
	active: {
		type: Sequelize.DataTypes.STRING,
		values: activeEnum,
		allowNull: false,
	},
});

module.exports = Prescription;