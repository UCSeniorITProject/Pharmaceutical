const {boomify} = require('boom');
const Prescription = require('./PrescriptionModel');

exports.createPrescription = async (req, reply) => {
	try {
		const prescription = await Prescription.build(req.body.prescription);

		const savedPrescription = await prescription.save();
		return {prescription: savedPrescription.dataValues};
	} catch (err) {
		throw boomify(err);
	}
};

exports.deletePrescription = async (req, reply) => {
	try {
		const prescriptionDeleteCount = await Prescription.destroy({
			where: {
				id: req.params.id,
			},
		});
	
		if(prescriptionDeleteCount === 0){
			return reply
								.code(404)
								.send({
									msg: 'Prescription not found',
								});
		}
	
		return reply
						.code(204)
						.send();
	} catch (err) {
		throw boomify(err);
	}
};

exports.patchPrescription = async (req, reply) => {
	try {
		if(Object.entriies(req.body.prescription).length === 0){
      const prescription = await Prescription.findOne({
        where: {
          id: req.params.id,
        }
      });

      return {prescription: prescription.dataValues};
    }

    const updatedprescriptionCount = await Prescription.update(
      req.body.prescription,
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      }
    );

    if(updatedprescriptionCount[1].length === 0){
      return reply
                .code(404)
                .send();
    }

    const updatedPrescription = await Prescription.findOne({
      where: {
        id: req.params.id,
      },
    });

    return {prescription: updatedPrescription.dataValues};
	} catch (err) {
		throw boomify(err);
	}
};

exports.getPrescriptionWithFilter = async (req, reply) => {
	try {
		const prescriptions = await Prescription.findAll({
			where: req.query,
		});

		return {prescription: prescriptions.map(x => x.dataValues)}
	} catch (err) {
		throw boomify(err);
	}
};