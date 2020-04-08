const {boomify} = require('boom');
const PrescriptionReason = require('./PrescriptionReasonModel');
const sequelize = require('../dbConnection');
const {QueryTypes} = require('sequelize');
const moment = require('moment');

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

exports.getPrescriptionReasonCount = async (req, reply) => {
	try {
		const prescriptionReasonCount = await sequelize.query(
			`
			SELECT count(prds.prescriptionReasonId) as numReason, pr.reasonCode  FROM PrescriptionPrescribableDrugReasons prds
				JOIN PrescriptionPrescribableDrugs ppd on ppd.prescriptionPrescribableDrugId = prds.prescriptionPrescribableDrugId
				JOIN PrescriptionReasons pr on pr.prescriptionReasonId = prds.prescriptionReasonId
				JOIN Prescriptions pp on pp.prescriptionId = ppd.prescriptionId and pp.patientId = :patientId
				WHERE pp.createdAt between :lastYearRolling and :today
				GROUP BY pr.reasonCode;
			`,
			{
				replacements: {patientId: req.params.patientId, lastYearRolling: moment().subtract(1, 'year').toDate(), today: moment().toDate()},
				type: QueryTypes.SELECT,
			}
		);
		return{data: prescriptionReasonCount};
	} catch (err){
		throw boomify(err);
	}
}

exports.getPrescribablesAggregatedByReason = async (req, reply) => {
	try {
		const prescribableByReason = await sequelize.query(
			`
			SELECT COUNT(ppd.prescribableId) as numPrescriptions, PR.reasonCode, p2.name as prescribableName
				FROM PrescriptionPrescribableDrugs ppd
				JOIN Prescriptions P on ppd.prescriptionId = P.prescriptionId and P.createdAt between :lastYearRolling and :today
				JOIN PrescriptionPrescribableDrugReasons PPDR on ppd.prescriptionPrescribableDrugId = PPDR.prescriptionPrescribableDrugId
				JOIN Prescribables P2 on ppd.prescribableId = P2.prescribableId
				JOIN PrescriptionReasons PR on PPDR.prescriptionReasonId = PR.prescriptionReasonId
				WHERE P.patientId = :patientId
				group by PR.reasonCode, p2.name
			`,
			{
				replacements: {patientId: req.params.patientId, lastYearRolling: moment().subtract(1, 'year').toDate(), today: moment().toDate()},
				type: QueryTypes.SELECT,
			}
		);
		return {data: prescribableByReason};
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