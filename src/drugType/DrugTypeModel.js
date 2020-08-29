const SequelizeInstance = require('../dbConnection');
const Sequelize = require('sequelize');
const activeEnum = require('../constants/activeEnum');

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
    if(roleSeedData.length){
      return Role.bulkCreate(roleSeedData, {individualHooks: true});
    }
  } catch (err){
    console.log(`Error creating drug type seed data ${err}`);
  }
});

module.exports = DrugType;