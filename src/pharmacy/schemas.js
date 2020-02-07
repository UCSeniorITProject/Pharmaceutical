const activeEnum = require('../constants/activeEnum');

const pharmacyBeforeSave = {
	address: {
		type: 'string',
		description: 'The address of the pharmacy',
	},
	zipCode: {
		type: 'string',
		description: 'The zip code of the pharmacy',
	},
	city: {
		type: 'string',
		description: 'The city of the pharmacy',
	},
	state: {
		type: 'string',
		description: 'The state of the pharmacy',
	},
	name: {
		type: 'string',
		description: 'The name of the pharmacy',
	},
	active: {
		type: 'string',
		enum: activeEnum,
		description: 'Whether or not the pharmacy is active',
	},
};

const pharmacyAfterSave = {
	...pharmacyBeforeSave,
	pharmacyId: {
		type: 'number',
		description: 'The id of the row',
	},
	updatedAt: {
		type: 'string',
		description: 'The time the last row was updated',
	},
	createdAt: {
		type: 'string',
		description: 'The time that the last row was created',
	},
};

exports.createPharmacy = {
  description: 'Creates a pharmacy with the given body',
  tags: ['Pharmacy'],
  summary: 'Creates a pharmacy and applies the given body',
  body: {
    type: 'object',
    description: 'The pharmacy to create',
    properties: {
      pharmacy: {
        type: 'object',
        properties: pharmacyBeforeSave,
      }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'The pharmacy to create',
      type: 'object',
      properties: {
        pharmacy: {
          type: 'object',
          properties: pharmacyAfterSave,
          description: 'The pharmacy that was saved',
        },
      },
    },
  },
};

exports.deletePharmacy = {
  description: 'Deletes a pharmacy with the given ID',
  tags: ['Pharmacy'],
  summary: 'Deletes a pharmacy with the given  ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the pharmacy to delete',
      },
    },
  },
  exposeRoute: true,
  response: {
    204: {
      description: 'Succesfully deleted the pharmacy',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'Succesfully deleted the pharmacy'
        },
      },
    },
    404: {
      description: 'The pharmacy was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The pharmacy was not found',
        },
      }, 
    },
  },
};

exports.patchPharmacy = {
  description: 'Patches a pharmacy with the given ID',
  tags: ['Pharmacy'],
  summary: 'Patches a pharmacy with the given  ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the pharmacy to patch',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      pharmacy: {
        type: 'object',
        properties: pharmacyBeforeSave,
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Succesfully patched the pharmacy',
      type: 'object',
      properties: {
        pharmacy: {
          type: 'string',
          properties: pharmacyAfterSave,
          description: 'The pharmacy that was patched',
        },
      },
    },
    404: {
      description: 'The pharmacy was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The pharmacy was not found',
        },
      }, 
    }
  }
};

exports.getPharmacyWithFilter = {
  description: 'Gets all pharmacy that match the given filter',
  tags: ['Pharmacy'],
  summary: 'Grabs all pharmacy that match the given filter',
  query: {
    type: 'object',
    properties: pharmacyAfterSave,
  },
  exposeRoute: true,
  response: {
    200: {
      type: 'object',
      description: 'Succesfully got a list of all pharmacies',
      properties: {
        pharmacy: {
          type: 'array',
          items: {
            type: 'object',
            properties: pharmacyAfterSave,
          },
        },
      },
    },
  }
};