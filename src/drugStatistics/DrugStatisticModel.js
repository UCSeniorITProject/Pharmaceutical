const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const config = require('../../config');

const DrugStatistic = SequelizeInstance.define('DrugStatistic', {
	drugStatisticId: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	drugId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'Drugs',
      key: 'drugId',
		}
	},
	statisticType: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'StatisticTypes',
      key: 'statisticTypeId',
		}
	},
	statisticValue: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	}
});

DrugStatistic.sync({force: config.db.forceTableCreation});

module.exports = DrugStatistic;