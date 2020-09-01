const DrugStatistic = require('./DrugStatisticModel');
const {boomify} = require('boom');

exports.createDrugStatisticBulk = async (req, reply) => {
	try {
		const drugStatistics = await DrugStatistic.bulkCreate(req.body.drugStatistics);
		return {drugStatistics: drugStatistics.map(x => x.dataValues)}
	} catch (err) {
		throw boomify(err);
	}
}

exports.getDrugStatisticWithFilter = async (req, reply) => {
	try {
		const drugStatistics = await DrugStatistic.findAll({
			where: req.query,
		});

		return {drugStatistics: drugStatistics.map(x => x.dataValues)}
	} catch (err) {
		throw boomify(err);
	}
};