const {boomify} = require('boom');
const PrescriptionReason = require('./PrescriptionReasonModel');

exports.createPrescriptionReason = async (req, reply) => {
  try {
    const prescriptionReason = PrescriptionReason.build(req.body.prescriptionReason);

    const prescriptionReasonSaved = await prescriptionReason.save();
    return {prescriptionReason: prescriptionReasonSaved.dataValues};
  } catch (err) {
    throw boomify(err);
  }
};

exports.deletePrescriptionReason = async (req, reply) => {
  try {
    const prescriptionReasonDeletedCount = await PrescriptionReason.destroy({
      where: {
        prescriptionReasonId: req.params.id,
      },
    });

    if(prescriptionReasonDeletedCount === 0){
      return reply
                .code(404)
                .send({
                  msg: 'Prescription reason not found',
                });
    }

    return reply
              .code(204)
              .send();
  } catch (err) {
    throw boomify(err);
  }
};

exports.patchPrescriptionReason = async (req, reply) => {
  try {
    if(Object.entries(req.body.prescriptionReason).length === 0){
      const prescriptionReason = await PrescriptionReason.findOne({
        where: {
          prescriptionReasonId: req.params.id,
        }
      });

      return {prescriptionReason: prescriptionReason.dataValues};
    }

    const updatedPrescriptionReason = await PrescriptionReason.update(
      req.body.prescriptionReason,
      {
        where: {
          prescriptionReasonId: req.params.id,
        },
        individualHooks: true,
      }
    );

    if(updatedPrescriptionReason[1].length === 0){
      return reply
                .code(404)
                .send();
    }

    const prescriptionReason = await PrescriptionReason.findOne({
      where: {
        prescriptionReasonId: req.params.id,
      },
    });

    return {prescriptionReason: prescriptionReason.dataValues};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getPrescriptionReasonWithFilter = async (req, reply) => {
  try {
    const prescriptionReasons = await PrescriptionReason.findAll({
      where: req.query,
    });

    return {prescriptionReasons: prescriptionReasons.map(x => x.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getPrescriptionReasonList = async (req, reply) => {
  try {
    const prescriptionReasons = await PrescriptionReason.findAll();

    return {prescriptonReasons: prescriptionReasons.map(x => x.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
};