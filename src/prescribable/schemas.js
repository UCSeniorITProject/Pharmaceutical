const activeEnum = require('../constants/activeEnum');

const prescribableBeforeSave = {
  dosage: {
    type: 'string',
    description: 'The dosage of the prescription',
  },
  dosageUnit: {
    type: 'string',
    description: 'The unit that the dosage is stored in',
  },
  dosageFrequency: {
    type: 'string',
    description: 'The frequency that the dose should be given in',
  },
  minWeight: {
    type: 'number',
    description: 'The weight, in pounds, that the patient must weight to be allowed to be prescribed',
  },
  requiredGender: {
    type: 'string',
    enum: ['M', 'F'],
    description: 'The gender the prescribable was made for',
  },
  active: {
    type: 'string',
    enum: activeEnum,
    description: 'Whether or not the row is active',
  }
};

const prescribableAfterSave = { 
  ...prescribableBeforeSave,
  prescirbableId: {
    type: 'number',
    description: 'The id of the prescribable',
  },
  createdAt: {
    type: 'string',
    description: 'The time the prescribable was created',
  },
  updatedAt: {
    type: 'string',
    description: 'When the row was last updated',
  }
};

exports.createPrescribable = {
  description: 'Creates a prescribable with the given body',
  tags: ['Prescribable'],
  summary: 'Creates a prescribable and applies the given body',
  body: {
    type: 'object',
    description: 'The prescribable to create',
    properties: {
      prescribable: {
        type: 'object',
        properties: prescribableBeforeSave,
      }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'The prescribable to create',
      type: 'object',
      properties: {
        prescribable: {
          type: 'object',
          properties: prescribableAfterSave,
          description: 'The prescribable that was saved',
        },
      },
    },
  },
};

exports.deletePrescribable = {
  description: 'Deletes a prescribable with the given ID',
  tags: ['Prescribable'],
  summary: 'Deletes a prescribable with the given  ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the prescribable to delete',
      },
    },
  },
  exposeRoute: true,
  response: {
    204: {
      description: 'Succesfully deleted the prescribable',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'Succesfully deleted the prescribable'
        },
      },
    },
    404: {
      description: 'The prescribable was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The prescribable was not found',
        },
      }, 
    },
  },
};

exports.patchPrescribable = {
  description: 'Patches a prescribable with the given ID',
  tags: ['Prescribable'],
  summary: 'Patches a prescribable with the given  ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the prescribable to patch',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      prescribable: {
        type: 'object',
        properties: prescribableBeforeSave,
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Succesfully patched the prescribable',
      type: 'object',
      properties: {
        prescribable: {
          type: 'string',
          properties: prescribableAfterSave,
          description: 'The prescribable that was patched',
        },
      },
    },
    404: {
      description: 'The prescribable was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The prescribable was not found',
        },
      }, 
    }
  }
};

exports.getPrescribableList = {
  description: 'Gets a list of all prescribables',
  tags: ['Prescribable'],
  summary: 'Gets a list of all prescribables wwith no filter',
  exposeRoute: true,
  response: {
    200: {
      type: 'object',
      description: 'Succesfully got a list of all prescribables',
      properties: {
        prescribables: {
          type: 'array',
          items: {
            type: 'object',
            properties: prescribableAfterSave,
          },
        },
      },
    },
  },
};

exports.getPrescribableWithFilter = {
  description: 'Gets all prescribables that match the given filter',
  tags: ['Prescribable'],
  summary: 'Grabs all prescibables that match the given filter',
  query: {
    type: 'object',
    properties: prescribableBeforeSave,
  },
  exposeRoute: true,
  response: {
    200: {
      type: 'object',
      description: 'Succesfully got a list of all prescribables',
      properties: {
        prescribables: {
          type: 'array',
          items: {
            type: 'object',
            properties: prescribableAfterSave,
          },
        },
      },
    },
  }
};