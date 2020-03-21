const getNumberOfUsesPerDay = require('./getNumberOfUsesPerDayFromFrequency');

module.exports = (prescriptionPrescribableDrugHistory, prescriptionBeingPrescribed) => {
	return prescriptionPrescribableDrugHistory.filter(x => {
		if(x.prescriptionEndDate <= prescriptionBeingPrescribed.prescriptionStartDate){
			return true;
		}
		return false;
	}).length === 0;
}