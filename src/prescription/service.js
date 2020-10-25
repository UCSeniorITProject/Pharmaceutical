const { boomify } = require("boom");
const Prescription = require("./PrescriptionModel");
const Prescribable = require("../prescribable/PrescribableModel");
const sequelize = require("../dbConnection");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

exports.createPrescription = async (req, reply) => {
  try {
    const prescription = await Prescription.build(req.body.prescription);

    const savedPrescription = await prescription.save();
    return { prescription: savedPrescription.dataValues };
  } catch (err) {
    throw boomify(err);
  }
};

exports.getNumPrescriptionsPerMonthByDoctor = async (req, reply) => {
  try {
    const prescryptionsByMonth = await sequelize.query(
      `DECLARE @StartDate DATETIME2, @EndDate DATETIME2;

			SELECT @StartDate = :lastYearRolling, @EndDate = :today;
			
			;WITH d(d) AS
			(
				SELECT DATEADD(MONTH, n, DATEADD(MONTH, DATEDIFF(MONTH, 0, @StartDate), 0))
				FROM ( SELECT TOP (DATEDIFF(MONTH, @StartDate, @EndDate) + 1)
					n = ROW_NUMBER() OVER (ORDER BY [object_id]) - 1
					FROM sys.all_objects ORDER BY [object_id] ) AS n
			)
			SELECT
					createdAt = DATENAME(MONTH, d.d) + ' ' + cast(YEAR(d.d) as nvarchar),
					numPrescriptions = COUNT(p.prescriptionId)
			FROM d LEFT JOIN dbo.Prescriptions AS p
				ON p.createdAt >= d.d and p.createdAt <= DATEADD(MONTH, 1, d.d) and p.doctorId = :doctorId
			GROUP BY d.d
			ORDER BY d.d;
			`,
      {
        replacements: {
          doctorId: req.params.doctorId,
          lastYearRolling: moment().subtract(1, "year").toDate(),
          today: moment().toDate(),
        },
        type: QueryTypes.SELECT,
      }
    );

    return { data: prescryptionsByMonth };
  } catch (err) {
    throw boomify(err);
  }
};

exports.getPrescriptionsAggregatedByMonthForYear = async (req, reply) => {
  try {
    const prescriptionsByReason = await sequelize.query(
      `DECLARE @StartDate DATETIME2, @EndDate DATETIME2;

			SELECT @StartDate = :lastYearRolling, @EndDate = :today;
			
			;WITH d(d) AS
			(
				SELECT DATEADD(MONTH, n, DATEADD(MONTH, DATEDIFF(MONTH, 0, @StartDate), 0))
				FROM ( SELECT TOP (DATEDIFF(MONTH, @StartDate, @EndDate) + 1)
					n = ROW_NUMBER() OVER (ORDER BY [object_id]) - 1
					FROM sys.all_objects ORDER BY [object_id] ) AS n
			)
			SELECT
					createdAt = DATENAME(MONTH, d.d) + ' ' + cast(YEAR(d.d) as nvarchar),
					numPrescriptions = COUNT(p.prescriptionId)
			FROM d LEFT JOIN dbo.Prescriptions AS p
				ON p.createdAt >= d.d and p.createdAt <= DATEADD(MONTH, 1, d.d) and p.patientId = :patientId
			GROUP BY d.d
			ORDER BY d.d;
			`,
      {
        replacements: {
          patientId: req.params.patientId,
          lastYearRolling: moment().subtract(1, "year").toDate(),
          today: moment().toDate(),
        },
        type: QueryTypes.SELECT,
      }
    );
    return { data: prescriptionsByReason };
  } catch (err) {
    throw boomify(err);
  }
};

exports.deletePrescription = async (req, reply) => {
  try {
    const prescriptionDeleteCount = await Prescription.destroy({
      where: {
        prescriptionId: req.params.id,
      },
    });

    if (prescriptionDeleteCount === 0) {
      return reply.code(404).send({
        msg: "Prescription not found",
      });
    }

    return reply.code(204).send();
  } catch (err) {
    throw boomify(err);
  }
};

exports.patchPrescription = async (req, reply) => {
  try {
    if (Object.entries(req.body.prescription).length === 0) {
      const prescription = await Prescription.findOne({
        where: {
          prescriptionId: req.params.id,
        },
      });

      return { prescription: prescription.dataValues };
    }

    const updatedprescriptionCount = await Prescription.update(
      req.body.prescription,
      {
        where: {
          prescriptionId: req.params.id,
        },
        individualHooks: true,
      }
    );

    if (updatedprescriptionCount[1].length === 0) {
      return reply.code(404).send();
    }

    const updatedPrescription = await Prescription.findOne({
      where: {
        prescriptionId: req.params.id,
      },
    });

    return { prescription: updatedPrescription.dataValues };
  } catch (err) {
    throw boomify(err);
  }
};

exports.getPrescriptionWithFilter = async (req, reply) => {
  try {
    const prescriptions = await Prescription.findAll({
      where: req.query,
      include: [
        {
          model: Prescribable,
          as: "Prescribables",
          where: {
            active: "Y",
          },
        },
      ],
    });

    return { prescription: prescriptions.map((x) => x.dataValues) };
  } catch (err) {
    throw boomify(err);
  }
};
