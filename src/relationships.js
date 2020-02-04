const Drug = require('./drug/DrugModel');
const Prescribable = require('./prescribable/PrescribableModel');
const PrescriptionPrescribableDrug = require('./prescriptionPrescribableDrug/PrescriptionPrescribableDrugModel');
const Prescription = require('./prescription/PrescriptionModel');

module.exports = () => {
  Drug.hasMany(Prescribable, {
    as: 'Drug',
    foreignKey: 'prescribableId',
  });

  Prescribable.belongsTo(Drug, {
    foreignKey: 'drugId',
  });

  Prescribable.belongsToMany(Prescription, {
    through: PrescriptionPrescribableDrug,
    foreignKey: 'prescribableId',
  });

  Prescription.belongsToMany(Prescribable, {
    through: PrescriptionPrescribableDrug,
    foreignKey: 'prescriptionId',
  });
};