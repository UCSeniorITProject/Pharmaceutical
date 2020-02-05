const activeEnum = require('../constants/activeEnum');

const drugBeforeSave = {
  name: {
    type: 'string',
    description: 'The name of the drug being prescribed',
  },
  manufacturer: {
    type: 'string',
    description: 'The manufacturer of the drug',
  },
  nonGenericParentId: {
    type: 'string',
    description: 'The parent ID of the drug if it is generic',
  },
  federalDrugIdentifier: {
    type: 'string',
    description: 'The ID of the drug on the federal level',
  },
  active: {
    type: 'string',
    enum: activeEnum,
    description: 'Whether or not the drug is active',
  },
};

const drugAfterSave = {
  ...drugBeforeSave,
  createdAt:{
    type: 'string',
    description: 'The time when the drug was created',
  },
  updatedAt: {
    type: 'string',
    description: 'The time when the drug was updated',
  },
  drugId: {
    type: 'number',
    description: 'The id of the drug',
  },
};

exports.createDrug = {
  description: 'Creates a drug with the given body',
  tags: ['Drug'],
  summary: 'Creates a drug with the given body',
  body: {
    type: 'object',
    description: 'The drug to create',
    properties: {
      drug: {
        type: 'object',
        properties: drugBeforeSave,
      }
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created the drug',
      type: 'object',
      properties: {
        drug: {
          type: 'object',
          properties: drugAfterSave,
          description: 'The drug that was saved',
        }
      }
    },
  },
};

exports.deleteDrug = {
  description: 'Deletes the drug based on the provided ID',
  tags: ['Drug'],
  summary: 'Deletes the drug with the given ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the drug to delete',
      }
    },
  },
  exposeRoute: true,
  response: {
    204: {
      description: 'Successfully deleted the drug',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'Succesfully deleted the drug',
        },
      }
    },
    404: {
      description: 'The drug was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The drug was not found',
        },
      },
    },
  },
};

exports.patchDrug = {
  description: 'Patches the drug based on the provided ID and body',
  tags: ['Drug'],
  summary: 'Patches the drug with the given ID and applies the given body',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the drug to patch',
      }
    },
  },
  exposeRoute: true,
  200: {
    description: 'Successfully patched the drug',
    type: 'object',
    properties: {
      drug: {
        type: 'object',
        properties: drugAfterSave,
        description: 'The patched drug',
      }
    }
  },
  404: {
    description: 'The drug was not found',
    type: 'object',
    properties: {
      msg: {
        type: 'string',
        default: 'The drug was not found',
      },
    },
  },
};

exports.drugList = {
  description: 'Gets the list of drugs',
  tags: ['Drug'],
  summary: 'Grabs a list of all drugs',
  exposeRoute: true,
  response: {
    200: {
      description: 'Succesfully grabbed a list of all drugs',
      type: 'object',
      properties: {
        drugs: {
          type: 'array',
          items: {
            type: 'object',
            properties: drugAfterSave,
          }
        }
      }
    },
  }
};

exports.drugWithFilter = {
  description: 'Gets a list of drugs with a filter',
  tags: ['Drug'],
  summary: 'Gets a list of drugs with a filter',
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully grabbed a list of all drugs with a filter',
      type: 'object',
      query: {
        type: 'object',
        properties: drugAfterSave,
      },
      properties: {
        drugs: {
          type: 'array',
          items: {
            type: 'object',
            properties: drugAfterSave,
          },
        },
      },
    },
  },
};