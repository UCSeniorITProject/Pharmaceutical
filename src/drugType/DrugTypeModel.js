const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const config = require('../../config');
const drugTypeSeedData = require('./drugTypeSeedData');

const DrugType = SequelizeInstance.define('DrugType', {
	drugTypeId: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	drugTypeName: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	}
});

DrugType.sync({force: config.db.forceTableCreation}).then(() => {
  try {
		console.log(drugTypeSeedData)
    if(drugTypeSeedData.length){
      return DrugType.bulkCreate(drugTypeSeedData, {individualHooks: true});
    }
  } catch (err){
    console.log(`Error creating drug type seed data ${err}`);
  }
});

module.exports = DrugType;