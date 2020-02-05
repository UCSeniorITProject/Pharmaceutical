const activeEnum = require('../constants/activeEnum');

const prescriptionReasonBeforeSave = {
  shortSummary:{
		type: 'string',
		description: 'The short summary of the prescription reason',
	},
	longSummary: {
		type: 'string',
		description: 'The long summary of the prescription reason',
	},
	active: {
		type: 'string',
		description: 'Whether or not the prescription is active',
		enum: activeEnum,
	},
};

const prescriptionReasonAfterSave = {
	...prescriptionReasonBeforeSave,
	prescriptionReadId: {
		type: 'number',
		description: 'The id of the prescription reason',
	},
	updatedAt: {
		type: 'string',
		description: 'The last time the prescription reason was updated',
	},
	createdAt: {
		type: 'string',
		description: 'When the prescription reason was created',
	},
};

exports.createPrescriptionReason = {
  description: 'Creates a prescription reason with the given body',
  tags: ['PrescriptionReason'],
  summary: 'Creates a prescription reason and applies the given body',
  body: {
    type: 'object',
    description: 'The prescription reason to create',
    properties: {
      prescriptionReason: {
        type: 'object',
        properties: prescriptionReasonBeforeSave,
      }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'The prescription reason to create',
      type: 'object',
      properties: {
        prescriptionReason: {
          type: 'object',
          properties: prescriptionReasonAfterSave,
          description: 'The prescription reason that was saved',
        },
      },
    },
  },
};

exports.deletePrescriptionReason = {
  description: 'Deletes a prescription reason with the given id',
  tags: ['PrescriptionReason'],
  summary: 'Deletes the prescription reason with the given id',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the prescription reason to delete',
      },
    },
  },
  exposeRoute: true,
  response: {
    204: {
      description: 'Succesfully deleted the prescription reason',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'Succesfully deleted the prescription reason'
        },
      },
    },
    404: {
      description: 'The prescription reason was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The prescription reason was not found',
        },
      }, 
    },
  },
};

exports.patchPrescriptionReason = {
  description: 'Patches a prescription reason the given ID',
  tags: ['PrescriptionReason'],
  summary: 'Patches a prescription reason with the given ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the prescription reason drug  to patch',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      prescriptionReason: {
        type: 'object',
        properties: prescriptionReasonBeforeSave,
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Succesfully patched the prescription reason',
      type: 'object',
      properties: {
        prescriptionReason: {
          type: 'string',
          properties: prescriptionReasonAfterSave,
          description: 'The prescription reason that was patched',
        },
      },
    },
    404: {
      description: 'The prescription reason was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The prescription reason was not found',
        },
      }, 
    },
  },
};

exports.getPrescriptionReasonWithFilter = {
	description: 'Gets all prescription reasons that match the given filter',
  tags: ['PrescriptionReason'],
  summary: 'Grabs all prescription reasons that match the given filter',
  query: {
    type: 'object',
    properties: prescriptionReasonAfterSave,
  },
  exposeRoute: true,
  response: {
    200: {
      type: 'object',
      description: 'Succesfully got a list of all prescription reasons',
      properties: {
        prescribables: {
          type: 'array',
          items: {
            type: 'object',
            properties: prescriptionReasonAfterSave,
          },
        },
      },
    },
  },
};

exports.getPrescriptionReasonList = {
	description: 'Gets all prescription reasons',
  tags: ['PrescriptionReason'],
  summary: 'Grabs all prescription reasons',
  exposeRoute: true,
  response: {
    200: {
      type: 'object',
      description: 'Succesfully got a list of all prescription reasons',
      properties: {
        prescribables: {
          type: 'array',
          items: {
            type: 'object',
            properties: prescriptionReasonAfterSave,
          },
        },
      },
    },
  },
};