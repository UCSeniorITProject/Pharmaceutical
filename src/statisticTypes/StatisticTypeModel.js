const SequelizeInstance = require("../dbConnection");
const Sequelize = require("sequelize");
const config = require("../../config");
const statisticTypeSeedData = require("./statisticTypeSeedData");

const StatisticType = SequelizeInstance.define("StatisticType", {
  statisticTypeId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  statisticName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

StatisticType.sync({ force: config.db.forceTableCreation }).then(() => {
  try {
    if (statisticTypeSeedData.length) {
      return StatisticType.bulkCreate(statisticTypeSeedData, {
        individualHooks: true,
      });
    }
  } catch (err) {
    console.log(`Error creating statistic type seed data ${err}`);
  }
});

module.exports = StatisticType;
