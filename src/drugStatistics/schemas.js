const drugStatisticBeforeSave = {
  drugId: {
    type: "number",
  },
  statisticType: {
    type: "number",
  },
  statisticValue: {
    type: "string",
  },
};

const drugStatisticAfterSave = {
  ...drugStatisticBeforeSave,
  drugStatisticId: {
    type: "number",
  },
  createdAt: {
    type: "string",
  },
  updatedAt: {
    type: "string",
  },
};

exports.createDrugStatisticsBulk = {
  tags: ["DrugStatistic"],
  exposeRoute: true,
  body: {
    type: "object",
    properties: {
      drugStatistics: {
        type: "array",
        items: {
          type: "object",
          properties: drugStatisticBeforeSave,
        },
      },
    },
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: drugStatisticAfterSave,
      },
    },
  },
};

exports.getDrugStatisticsWithFilter = {
  tags: ["DrugStatistic"],
  exposeRoute: true,
  query: {
    type: "object",
    properties: drugStatisticAfterSave,
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: drugStatisticAfterSave,
      },
    },
  },
};
