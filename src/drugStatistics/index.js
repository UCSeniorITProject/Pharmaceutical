const drugStatisticSchema = require('./schemas');
const drugStatisticService = require('./service');

module.exports = (fastify, options, next) => {
  fastify.post('/drug-statistic/bulk', {schema: drugStatisticSchema.createDrugStatisticsBulk}, drugStatisticService.createDrugStatisticBulk);
	fastify.get('/drug-statistic', {schema: drugStatisticSchema.getDrugStatisticsWithFilter}, drugStatisticService.getDrugStatisticWithFilter);
	next();
}