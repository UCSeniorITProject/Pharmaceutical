const activeEnum = require('../constants/activeEnum');
const {prescribableAfterSave} = require('../prescribable/schemas');
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
	},
	prescribable: {
		type: 'object',
		properties: prescribableAfterSave,
	}
};

exports.getPrescriptionsByMonthForPatient = {
	description: 'Gets the list of prescriptions by month for the patient',
	tags: ['Prescription'],
	summary: 'Gets the list of prescriptions by month for the patient',
	exposeRoute: true,
	params: {
    type: 'object',
    required: ['patientId'],
    properties: {
      patientId: {
        type: 'number',
        description: 'The ID of the prescription to delete',
      }
    },
  },
	response: {
		200: {
			description: 'The list of the prescriptions by month',
			type: 'object',
			properties: {
				data: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							createdAt: {
								type: 'string',
								description: 'The grouped by aggregate date of the prescriptions by month'
							},
							numPrescriptions: {
								type: 'number',
								description: 'The number of prescriptions in that specific month',
							}
						}
					}
				},
			},
		},
	},
};

exports.getPrescriptionsByMonthForDoctor = {
	description: 'Gets the list of prescriptions by month for the doctor',
	tags: ['Prescription'],
	summary: 'Gets the list of prescriptions by month for the doctor',
	exposeRoute: true,
	params: {
    type: 'object',
    required: ['doctorId'],
    properties: {
      doctorId: {
        type: 'number',
        description: 'The ID of the doctor',
      }
    },
  },
	response: {
		200: {
			description: 'The list of the prescriptions by month',
			type: 'object',
			properties: {
				data: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							createdAt: {
								type: 'string',
								description: 'The grouped by aggregate date of the prescriptions by month'
							},
							numPrescriptions: {
								type: 'number',
								description: 'The number of prescriptions in that specific month',
							}
						}
					}
				},
			},
		},
	},
};

exports.createPrescription = {
  description: 'Creates a prescription with the given body',
  tags: ['Prescription'],
  summary: 'Creates a prescription with the given body',
  body: {
    type: 'object',
    description: 'The prescription to create',
    properties: {
      prescription: {
        type: 'object',
        properties: prescriptionBeforeSave,
      }
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created the prescription',
      type: 'object',
      properties: {
        prescription: {
          type: 'object',
          properties: prescriptionAfterSave,
          description: 'The prescription that was saved',
        }
      }
    },
  },
};

exports.deletePrescription = {
	description: 'Deletes the prescription based on the provided ID',
  tags: ['Prescription'],
  summary: 'Deletes the prescription with the given ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the prescription to delete',
      }
    },
  },
  exposeRoute: true,
  response: {
    204: {
      description: 'Successfully deleted the prescription',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'Succesfully deleted the prescription',
        },
      }
    },
    404: {
      description: 'The prescription was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The prescription was not found',
        },
      },
    },
  },
};

exports.patchPrescription = {
	description: 'Patches the prescription based on the provided ID and body',
  tags: ['Prescription'],
  summary: 'Patches the prescription with the given ID and applies the given body',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the prescription to patch',
      }
    },
  },
  exposeRoute: true,
  200: {
    description: 'Successfully patched the prescription',
    type: 'object',
    properties: {
      prescription: {
        type: 'object',
        properties: prescriptionAfterSave,
        description: 'The patched prescription',
      }
    }
  },
  404: {
    description: 'The prescription was not found',
    type: 'object',
    properties: {
      msg: {
        type: 'string',
        default: 'The prescription was not found',
      },
    },
  },
};


exports.prescriptionWithFilter = {
  description: 'Gets a list of prescription with a filter',
  tags: ['Prescription'],
  summary: 'Gets a list of prescription with a filter',
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully grabbed a list of all prescription with a filter',
      type: 'object',
      query: {
        type: 'object',
        properties: prescriptionAfterSave,
      },
      properties: {
        prescriptions: {
          type: 'array',
          items: {
            type: 'object',
            properties: prescriptionAfterSave,
          },
        },
      },
    },
  },
};