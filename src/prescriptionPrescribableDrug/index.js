const prescriptionPrescribableDrugSchema = require('./schemas');
const prescriptionPrescribableDrugService = require('./service');

module.exports = (fastify, options, next) => {
  fastify.post('/prescription-prescribable-drug', {schema: prescriptionPrescribableDrugSchema.createPrescriptionPrescribableDrug}, prescriptionPrescribableDrugService.createPrescriptionPrescribableDrug);
  fastify.delete('/prescription-prescribable-drug/:id', {schema: prescriptionPrescribableDrugSchema.deletePrescriptionPrescribableDrug}, prescriptionPrescribableDrugService.deletePrescriptionPrescribableDrug);
  fastify.patch('/prescription-prescribable-drug/:id', {schema: prescriptionPrescribableDrugSchema.patchPrescriptionPrescribableDrug}, prescriptionPrescribableDrugService.patchPrescriptionPrescribableDrug);
  fastify.get('/prescription-prescribable-drug', {schema: prescriptionPrescribableDrugSchema.getPrescriptionPrescribableDrugWithFilter}, prescriptionPrescribableDrugService.getPrescriptionWithFilter);
  next();
};