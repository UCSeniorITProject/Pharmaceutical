const PrescriptionPrescribableDrug = require('./prescriptionPrescribableDrug/PrescriptionPrescribableDrugModel');
const Prescription = require('./prescription/PrescriptionModel');

module.exports = () => {
	PrescriptionPrescribableDrug.belongsTo(Prescription, {foreignKey: 'prescriptionId'});
	Prescription.hasMany(PrescriptionPrescribableDrug, {foreignKey: 'prescriptionId'});
}