const { boomify } = require("boom");
const PrescriptionPrescribableDrugReason = require("./PrescriptionPrescribableDrugReason");
const sequelize = require("../dbConnection");
const { QueryTypes } = require("sequelize");
const moment = require("moment");
exports.createPrescriptionPrescribableDrugReason = async (req, reply) => {
  try {
    const prescriptionPrescribableDrugReason = PrescriptionPrescribableDrugReason.build(
      req.body.prescriptionPrescribableDrugReason
    );

    const savedPrescriptionPrescribableDrugReason = await prescriptionPrescribableDrugReason.save();
    return {
      prescriptionPrescribableDrugReason:
        savedPrescriptionPrescribableDrugReason.dataValues,
    };
  } catch (err) {
    throw boomify(err);
  }
};

exports.getReasonBreakdownByDoctor = async (req, reply) => {
  try {
    const reasonBreakdown = await sequelize.query(
      `
				SELECT count(PPDR.prescriptionReasonId) as numPrescribableReason, PR.reasonCode as prescribableReasonName FROM Prescriptions PS
					JOIN PrescriptionPrescribableDrugs PPD on PS.prescriptionId = PPD.prescriptionId AND PS.doctorId = :doctorId
					JOIN PrescriptionPrescribableDrugReasons PPDR on PPD.prescriptionPrescribableDrugId = PPDR.prescriptionPrescribableDrugId
					JOIN PrescriptionReasons PR on PR.prescriptionReasonId = PPDR.prescriptionReasonId
					WHERE PS.createdAt between :startDate and :endDate
					GROUP BY PR.reasonCode;
			`,
      {
        replacements: {
          doctorId: req.params.doctorId,
          startDate: moment().subtract(1, "year").toDate(),
          endDate: moment().toDate(),
        },
        type: QueryTypes.SELECT,
      }
    );

    return { data: reasonBreakdown };
  } catch (err) {
    throw boomify(err);
  }
};

exports.deletePrescriptionPrescribableDrugReason = async (req, reply) => {
  try {
    const prescriptionPrescribableDrugReasonDeleteCount = await PrescriptionPrescribableDrugReason.destroy(
      {
        where: {
          prescriptionId: req.params.id,
        },
      }
    );

    if (prescriptionPrescribableDrugReasonDeleteCount === 0) {
      return reply.code(404).send({
        msg: "Prescription prescribable drug reason not found",
      });
    }

    return reply.code(204).send();
  } catch (err) {
    throw boomify(err);
  }
};

exports.patchPrescriptionPrescribableDrugReason = async (req, reply) => {
  try {
    if (
      Object.entries(req.body.prescriptionPrescribableDrugReason).length === 0
    ) {
      const prescriptionPrescribableDrugReason = await PrescriptionPrescribableDrugReason.findOne(
        {
          where: {
            prescriptionId: req.params.id,
          },
        }
      );

      return {
        prescriptionPrescribableDrugReason:
          prescriptionPrescribableDrugReason.dataValues,
      };
    }
  } catch (err) {
    throw boomify(err);
  }
};

exports.getPrescriptionPrescribableDrugReasonWithFilter = async (
  req,
  reply
) => {
  try {
    const prescriptionPrescribableDrugReasons = PrescriptionPrescribableDrugReason.findAll(
      {
        where: req.query,
      }
    );

    return {
      prescriptionPrescribableDrugReasons: prescriptionPrescribableDrugReasons.map(
        (x) => x.dataValues
      ),
    };
  } catch (err) {
    throw boomify(err);
  }
};
