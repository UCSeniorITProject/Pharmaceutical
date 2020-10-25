const SequelizeInstance = require("../dbConnection");
const Sequelize = require("sequelize");
const config = require("../../config");
const Drug = require("../drug/DrugModel");
const DrugStatistic = SequelizeInstance.define("DrugStatistic", {
  drugStatisticId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  drugId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  statisticType: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  statisticValue: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

DrugStatistic.sync({ force: config.db.forceTableCreation });

module.exports = DrugStatistic;
