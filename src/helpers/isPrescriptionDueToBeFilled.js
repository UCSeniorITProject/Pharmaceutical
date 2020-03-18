const getNumberOfUsesPerDay = require('./getNumberOfUsesPerDayFromFrequency');

module.exports = (prescriptionPrescribableDrugHistory, prescribableInfo, prescriptionBeingPrescribed) => {
	let isFillable = false;
	const sortedPrescriptionPrescribableDrugHistory = prescriptionPrescribableDrugHistory.sort((a, b) => {
		return new Date(b.prescriptionStartDate) - new Date(a.prescriptionStartDate);
	});
	const numUsesPerDay = getNumberOfUsesPerDay(prescribableInfo.dosageFrequency);
	isFillable = sortedPrescriptionPrescribableDrugHistory.filter(x => {
		const numberOfDaysPrescriptionLasted = x.numDoses / numUsesPerDay;
		const lastDayOfPrescription = moment(x.prescriptionStartDate).add(numberOfDaysPrescriptionLasted, 'days');
		if(lastDayOfPrescription >= prescriptionBeingPrescribed.prescriptionStartDate){
			return true;
		}
		return false;
	}).length === 0;
	return isFillable;
}