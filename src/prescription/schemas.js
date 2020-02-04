const activeEnum = require('../constants/activeEnum');

const prescriptionBeforeSave = {
	patientId: {
		type: 'number',
		description: 'The id of the patient the prescription is for',
	},
	pharmacyId: {
		type: 'number',
		description: 'The id of the pharmacy to send the prescription to',
	},
	doctorId: {
		type: 'number',
		description: 'The id of the doctor that created the prescription',
	},
	active: {
		type: 'string',
		enum: activeEnum,
		description: 'Whether or not the prescription is active',
	},
};

const prescriptionAfterSave = {
	...prescriptionBeforeSave,
	prescriptionId: {
		type: 'number',
		description: 'The id of the prescription',
	},
	createdAt: {
		type: 'string',
		description: 'When the prescription was created',
	},
	updatedAt: {
		type: 'string',
		description: 'When the prescription was last updated',
	}
}