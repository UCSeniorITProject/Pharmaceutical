const drugTypeAfterSave = {
	drugTypeId: {
		type: 'number'
	},
	drugTypeName: {
		type: 'string',
	},
	createdAt: {
		type: 'string',
	},
	updatedAt: {
		type: 'string',
	},
}

exports.getDrugTypeWithFilter = {
	description: 'Get list of drug types by filter',
	tags: ['DrugType'],
	query: {
		type: 'object',
		properties: drugTypeAfterSave,
	},
	exposeRoute: true,
	response: {
		200: {
			type: 'object',
			properties: {
				drugTypes: {
					type: 'array',
					items: {
						type: 'object',
						properties: drugTypeAfterSave,
					}
				}
			}
		},
	},
}