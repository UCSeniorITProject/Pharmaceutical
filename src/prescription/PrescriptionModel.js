const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');

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
			model: {tableName: 'Patients', schema: 'dbo',},
			key: 'patientId',
		},
	},
	pharmacyId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: {tableName: 'Pharmacies', schema: 'dbo',},
			key: 'pharmacyId',
		},
	},
	doctorId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: {tableName: 'Users', schema: 'dbo',},
			key: 'id',
		},
	},
	active: {
		type: Sequelize.DataTypes.STRING,
		values: activeEnum,
		allowNull: false,
	},
});

module.exports = Prescription;