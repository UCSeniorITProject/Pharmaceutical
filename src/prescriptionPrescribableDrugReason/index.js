const prescriptionPrescribableDrugReasonSchema = require('./schemas');
const prescriptionPrescribableDrugReasonService = require('./service');

module.exports = (fastify, options, next) => {
	fastify.post('/prescription-prescribable-drug-reason', {schema: prescriptionPrescribableDrugReasonSchema.createPrescriptionPrescribableDrugReason}, prescriptionPrescribableDrugReasonService.createPrescriptionPrescribableDrugReason);
	fastify.delete('/prescription-prescribable-drug-reason/:id', {schema: prescriptionPrescribableDrugReasonSchema.deletePrescriptionPrescribableDrugReason}, prescriptionPrescribableDrugReasonService.deletePrescriptionPrescribableDrugReason);
	fastify.patch('/prescription-prescribable-drug-reason/:id', {schema: prescriptionPrescribableDrugReasonSchema.patchPrescriptionPrescribableDrugReason}, prescriptionPrescribableDrugReasonService.patchPrescriptionPrescribableDrugReason);
	fastify.get('/prescription-prescribable-drug-reason', {schema: prescriptionPrescribableDrugReasonSchema.getPrescriptionPrescribableDrugReasonWithFilter}, prescriptionPrescribableDrugReasonService.getPrescriptionPrescribableDrugReasonWithFilter);
	next();
};