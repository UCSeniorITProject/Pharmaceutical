const drugTypeSchema = require('./schemas');
const drugTypeService = require('./service');

module.exports = (fastify, options, next) => {
	fastify.get('/drug-type', {schema: drugTypeSchema.getDrugTypeWithFilter}, drugTypeService.getDrugTypeWithFilter);
	next();
};