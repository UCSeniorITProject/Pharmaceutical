const statisticTypeBeforeSave = {
	statisticName: {
		type: 'string'
	}
};

const statisticTypeAfterSave = {
	...statisticTypeBeforeSave,
	statisticTypeId: {
		type: 'number',
	},
	createdAt: {
		type: 'number',
	},
	updatedAt: {
		type: 'number',
	},
};


exports.getStatisticTypeWithFilter = {
	tags: ['StatisticType'],
	exposeRoute: true,
  query: {
    type: 'object',
    properties: statisticTypeAfterSave,
  },
	response: {
		200: {
			description: 'The list of the statistic types',
			type: 'object',
			properties: {
				statisticTypes: {
					type: 'array',
					items: {
								type: 'object',
								properties: statisticTypeAfterSave,
							}
						}
					}
				},
			}
}

exports.createStatisticType = {
	description: 'Creates a statistic type with the given body',
  tags: ['StatisticType'],
  summary: 'Creates a statistic type and applies the given body',
  body: {
    type: 'object',
    description: 'The statistic type to create',
    properties: {
      statisticType: {
        type: 'object',
        properties: statisticTypeBeforeSave,
      }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'The statistic type to create',
      type: 'object',
      properties: {
        statisticType: {
          type: 'object',
          properties: statisticTypeAfterSave,
          description: 'The statistic type that was saved',
        },
      },
    },
  },
}