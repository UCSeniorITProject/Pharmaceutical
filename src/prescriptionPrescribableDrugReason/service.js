const {boomify} = require('boom');
const PrescriptionPrescribableDrugReason = require('./PrescriptionPrescribableDrugReason');

exports.createPrescriptionPrescribableDrugReason = async (req, reply) => {
	try {
		const prescriptionPrescribableDrugReason = PrescriptionPrescribableDrugReason.build(req.body.prescriptionPrescribableDrugReason);

		const savedPrescriptionPrescribableDrugReason = await prescriptionPrescribableDrugReason.save();
		return {prescriptionPrescribableDrugReason: savedPrescriptionPrescribableDrugReason.dataValues}
	} catch (err){
		throw boomify(err);
	}
};

exports.deletePrescriptionPrescribableDrugReason = async (req, reply) => {
	try {
		const prescriptionPrescribableDrugReasonDeleteCount = await PrescriptionPrescribableDrugReason.destroy({
			where: {
				prescriptionId: req.params.id,
			},
		});

		if(prescriptionPrescribableDrugReasonDeleteCount === 0){
			return reply
							.code(404)
							.send({
								msg: 'Prescription prescribable drug reason not found',
							});
		}

		return reply
							.code(204)
							.send();
	} catch (err) {
		throw boomify(err);
	}
};

exports.patchPrescriptionPrescribableDrugReason = async (req, reply) => {
	try {
		if(Object.entries(req.body.prescriptionPrescribableDrugReason).length === 0){
      const prescriptionPrescribableDrugReason = await PrescriptionPrescribableDrugReason.findOne({
        where: {
          prescriptionId: req.params.id,
        }
      });

      return {prescriptionPrescribableDrugReason: prescriptionPrescribableDrugReason.dataValues};
    }
	} catch (err) {
		throw boomify(err);
	}
};

exports.getPrescriptionPrescribableDrugReasonWithFilter = async (req, reply) => {
	try {
		const prescriptionPrescribableDrugReasons = PrescriptionPrescribableDrugReason.findAll({
			where: req.query,
		});

		return {prescriptionPrescribableDrugReasons: prescriptionPrescribableDrugReasons.map(x => x.dataValues)}
	} catch (err) {
		throw boomify(err);
	}
};