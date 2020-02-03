const drugSchema = require('./schemas');
const drugService = require('./service');

module.exports = (fastify, options, next) =>  {
  fastify.post('/drug', {schema: drugSchema.createDrug}, drugService.createDrug);
  fastify.delete('/drug/:id', {schema: drugSchema.deleteDrug}, drugService.deleteDrug);
  fastify.patch('/drug/:id', {schema: drugSchema.patchDrug}, drugService.patchDrug);
  fastify.get('/drug/list', {schema: drugSchema.drugList}, drugService.getDrugList);
  fastify.get('/drug', {schema: drugSchema.drugWithFilter}, drugService.getDrugWithFilter);
  next();
};