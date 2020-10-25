const activeEnum = require("../constants/activeEnum");

const prescriptionPrescribableDrugReasonBeforeSave = {
  prescriptionPrescribableDrugId: {
    type: "number",
    description:
      "The id of the prescription prescribable drug to assign the reason to",
  },
  prescriptionReasonId: {
    type: "number",
    description:
      "The id of the prescription reason to link the prescription prescribable drug to",
  },
  active: {
    type: "string",
    enum: activeEnum,
  },
};

const prescriptionPrescribableDrugReasonAfterSave = {
  ...prescriptionPrescribableDrugReasonBeforeSave,
  prescriptionPrescribableDrugReasonId: {
    type: "string",
    description: "The id of the row",
  },
  createdAt: {
    type: "string",
    description:
      "The time that the prescription prescribable drug reason was created",
  },
  updatedAt: {
    type: "string",
    description:
      "The time that the prescription prescribable drug reason was updated last",
  },
};

exports.createPrescriptionPrescribableDrugReason = {
  description:
    "Creates a prescription prescribable drug reason with the given body",
  tags: ["PrescriptionPrescribableDrugReason"],
  summary:
    "Creates a prescription prescribable drug reason and applies the given body",
  body: {
    type: "object",
    description: "The prescription prescribable drug reason to create",
    properties: {
      prescriptionPrescribableDrugReason: {
        type: "object",
        properties: prescriptionPrescribableDrugReasonAfterSave,
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: "The prescription prescribable drug reason to create",
      type: "object",
      properties: {
        prescriptionPrescribableDrugReason: {
          type: "object",
          properties: prescriptionPrescribableDrugReasonAfterSave,
          description:
            "The prescription prescribable drug reason that was saved",
        },
      },
    },
  },
};

exports.patchPrescriptionPrescribableDrugReason = {
  description:
    "Patches a prescription prescribable drug reason with the given ID",
  tags: ["PrescriptionPrescribableDrugReason"],
  summary: "Patches a prescription prescribable drug reason with the given  ID",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "number",
        description:
          "The ID of the prescription prescribable drug reason to patch",
      },
    },
  },
  body: {
    type: "object",
    properties: {
      prescribable: {
        type: "object",
        properties: prescriptionPrescribableDrugReasonBeforeSave,
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description:
        "Succesfully patched the prescription prescribable drug reason",
      type: "object",
      properties: {
        prescriptionPrescribableDrugReason: {
          type: "string",
          properties: prescriptionPrescribableDrugReasonAfterSave,
          description:
            "The prescription prescribable drug reason that was patched",
        },
      },
    },
    404: {
      description:
        "The prescription prescription prescribable drug reason was not found",
      type: "object",
      properties: {
        msg: {
          type: "string",
          default: "The prescription prescribable drug reason was not found",
        },
      },
    },
  },
};

exports.deletePrescriptionPrescribableDrugReason = {
  description:
    "Deletes a prescription prescribable drug reason with the given id",
  tags: ["PrescriptionPrescribableDrugReason"],
  summary:
    "Deletes the prescription prescribable drug reason with the given id",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "number",
        description:
          "The ID of the prescription prescribable drug reason to delete",
      },
    },
  },
  exposeRoute: true,
  response: {
    204: {
      description:
        "Succesfully deleted the prescription prescribable drug reason",
      type: "object",
      properties: {
        msg: {
          type: "string",
          default:
            "Succesfully deleted the prescription prescribable drug reason",
        },
      },
    },
    404: {
      description: "The prescription prescribable drug reason was not found",
      type: "object",
      properties: {
        msg: {
          type: "string",
          default: "The prescription prescribable drug reason was not found",
        },
      },
    },
  },
};

exports.getPrescriptionPrescribableDrugReasonWithFilter = {
  description:
    "Gets all prescription prescribable drug reasons that match the given filter",
  tags: ["PrescriptionPrescribableDrugReason"],
  summary:
    "Grabs all prescription prescribable drug reasons that match the given filter",
  query: {
    type: "object",
    properties: prescriptionPrescribableDrugReasonAfterSave,
  },
  exposeRoute: true,
  response: {
    200: {
      type: "object",
      description:
        "Succesfully got a list of all prescription prescribable drug reasons",
      properties: {
        prescribables: {
          type: "array",
          items: {
            type: "object",
            properties: prescriptionPrescribableDrugReasonAfterSave,
          },
        },
      },
    },
  },
};

exports.getReasonBreakdownByDoctor = {
  description: "Gets the breakdown of prescribable reasons by doctor",
  tags: ["Prescribable"],
  summary: "Gets the breakdown of prescribable reasons by doctor",
  params: {
    type: "object",
    required: ["doctorId"],
    properties: {
      doctorId: {
        type: "number",
        description: "The ID of the doctor to query by",
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              numPrescribableReason: {
                type: "number",
              },
              prescribableReasonName: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
