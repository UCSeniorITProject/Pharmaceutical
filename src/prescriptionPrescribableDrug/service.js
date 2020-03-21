const {boomify} = require('boom');
const PrescriptionPrescribableDrug = require('./PrescriptionPrescribableDrugModel');
const { Op, literal } = require("sequelize");
const Prescription = require('../prescription/PrescriptionModel');
exports.createPrescriptionPrescribableDrug = async (req, reply) => {
  try {
		const prescriptionHistory = await PrescriptionPrescribableDrug.findAll({
			where: {
				[Op.or]: {
					prescriptionStartDate: {
						[Op.between]:
							[req.body.prescriptionPrescribableDrug.prescriptionStartDate,
							req.body.prescriptionPrescribableDrug.prescriptionEndDate]
					},
					prescriptionEndDate: {
						[Op.between]:
							[req.body.prescriptionPrescribableDrug.prescriptionStartDate,
							req.body.prescriptionPrescribableDrug.prescriptionEndDate],
					},
				},
				prescribableId: req.body.prescriptionPrescribableDrug.prescribableId,
				'$Prescription.patientId$': req.params.patientId,
			},
			include: [{model: Prescription, required: true}],	
		});
		if(prescriptionHistory.length === 0){
			const prescriptionPrescribableDrug = PrescriptionPrescribableDrug.build(req.body.prescriptionPrescribableDrug);
			const savedPrescriptionPrescribableDrug = await prescriptionPrescribableDrug.save();
			return {prescriptionPrescribableDrug: savedPrescriptionPrescribableDrug.dataValues};
		} else {
			return reply
								.code(409)
								.send({
									msg: 'The prescribable is not due to be prescribed yet.',
								});
		}
  } catch (err) {
    throw boomify(err);
  }
};

exports.deletePrescriptionPrescribableDrug = async (req, reply) =>  {
  try {
    const prescriptionPrescribableDrugDeletedCount = await PrescriptionPrescribableDrug.destroy({
      where: {
        prescriptionId: req.params.id,
      },
    });

    if(prescriptionPrescribableDrugDeletedCount === 0){
      return reply
                .code(404)
                .send({
                  msg: 'Prescription prescribable drug not found',
                });
    }

    return reply
              .code(204)
              .send();
  } catch (err){
    throw boomify(err);
  }
};

exports.patchPrescriptionPrescribableDrug = async (req, reply) =>  {
  try {
    if(Object.entries(req.body.prescriptionPrescribableDrug).length === 0){
      const prescriptionPrescribableDrug = await PrescriptionPrescribableDrug.findOne({
        where: {
          prescriptionId: req.params.id,
        }
      });

      return {prescriptionPrescribableDrug: prescriptionPrescribableDrug.dataValues};
    }

    const updatedPrescriptionPrescribableDrug = await PrescriptionPrescribableDrug.update(
      req.body.prescriptionPrescribableDrug,
      {
        where: {
          prescriptionId: req.params.id,
        },
        individualHooks: true,
      }
    );

    if(updatedPrescriptionPrescribableDrug[1].length === 0){
      return reply
                .code(404)
                .send();
    }

    const prescriptionPrescribableDrug = await PrescriptionPrescribableDrug.findOne({
      where: {
        prescriptionId: req.params.id,
      },
    });

    return {prescriptionPrescribableDrug: prescriptionPrescribableDrug.dataValues};
  } catch (err) {
    throw boomify(rer);
  }
};

exports.getPrescriptionWithFilter = async (req, reply) =>  {
  try {
    const prescriptionPrescribableDrugs = await PrescriptionPrescribableDrug.findAll(
      {
        where: req.query,
      }
    );

    return {prescriptionPrescribableDrugs: prescriptionPrescribableDrugs.map(x => x.dataValues)};
  } catch (err){
    throw boomify(err);
  }
};