const statisticTypeSchema = require('./schemas');
const statisticTypeService = require('./service');

module.exports = (fastify, options, next) => {
	fastify.get('/statistic-type', {schema: statisticTypeSchema.getStatisticTypeWithFilter}, statisticTypeService.getStatisticTypeByFilter);
	fastify.post('/statistic-type', {schema: statisticTypeSchema.createStatisticType}, statisticTypeService.createStatisticType);
  next();
};