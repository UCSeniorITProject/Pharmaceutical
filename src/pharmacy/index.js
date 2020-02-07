const pharmacySchema = require('./schemas');
const pharmacyService = require('./service');

module.exports = (fastify, options, next) => {
	fastify.post('/pharmacy', {schema: pharmacySchema.createPharmacy}, pharmacyService.createPharmacy);
	fastify.patch('/pharmacy/:id', {schema: pharmacySchema.patchPharmacy}, pharmacyService.patchPharmacy);
	fastify.delete('/pharmacy/:id', {schema: pharmacySchema.deletePharmacy}, pharmacyService.deletePharmacy);
	fastify.get('/pharmacy', {schema: pharmacySchema.getPharmacyWithFilter}, pharmacyService.getPharmacyWithFilter);
	next();
};