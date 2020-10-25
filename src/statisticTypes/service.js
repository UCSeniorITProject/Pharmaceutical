const { boomify } = require("boom");
const sequelize = require("../dbConnection");
const StatisticType = require("./StatisticTypeModel");

exports.createStatisticType = async (req, reply) => {
  try {
    const statistic = StatisticType.build(req.body.stasticType);

    const savedStatistic = await statistic.save();
    return { statisticType: savedStatistic.dataValues };
  } catch (err) {
    throw boomify(err);
  }
};

exports.getStatisticTypeByFilter = async (req, reply) => {
  try {
    const statistics = await StatisticType.findAll({
      where: req.query,
    });

    return { statisticTypes: statistics.map((x) => x.dataValues) };
  } catch (err) {
    throw boomify(err);
  }
};
