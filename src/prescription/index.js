const prescriptionSchema = require('./schemas');
const prescriptionService = require('./service');

module.exports = (fastify, options, next) => {
  fastify.post('/prescription', {schema: prescriptionSchema.createPrescription}, prescriptionService.createPrescription);
  fastify.delete('/prescription/:id', {schema: prescriptionSchema.deletePrescription}, prescriptionService.deletePrescription);
  fastify.patch('/prescription/:id', {schema: prescriptionSchema.deletePrescription}, prescriptionService.deletePrescription);
	fastify.get('/prescription', {schema: prescriptionSchema.prescriptionWithFilter}, prescriptionService.getPrescriptionWithFilter);
	fastify.get('/prescription/:patientId/month', {schema: prescriptionSchema.getPrescriptionsByMonthForPatient}, prescriptionService.getPrescriptionsAggregatedByMonthForYear);
  next();
};