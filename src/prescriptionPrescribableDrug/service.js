const {boomify} = require('boom');
const PrescriptionPrescribableDrug = require('./PrescriptionPrescribableDrugModel');
const { Op } = require("sequelize");
const Prescription = require('../prescription/PrescriptionModel');
const sequelize = require('../dbConnection');
const moment = require('moment');
const {QueryTypes} = require('sequelize');

exports.createPrescriptionPrescribableDrug = async (req, reply) => {
  try {
		const prescriptionHistory = await sequelize.query(
			`
				SELECT [PrescriptionPrescribableDrug].[prescriptionPrescribableDrugId],
					[PrescriptionPrescribableDrug].[prescriptionId],
					[PrescriptionPrescribableDrug].[prescribableId],
					[PrescriptionPrescribableDrug].[prescriptionStartDate],
					[PrescriptionPrescribableDrug].[prescriptionEndDate],
					[PrescriptionPrescribableDrug].[active],
					[PrescriptionPrescribableDrug].[createdAt],
					[PrescriptionPrescribableDrug].[updatedAt],
					[Prescription].[prescriptionId] AS [Prescription.prescriptionId],
					[Prescription].[patientId]      AS [Prescription.patientId],
					[Prescription].[pharmacyId]     AS [Prescription.pharmacyId],
					[Prescription].[doctorId]       AS [Prescription.doctorId],
					[Prescription].[active]         AS [Prescription.active],
					[Prescription].[createdAt]      AS [Prescription.createdAt],
					[Prescription].[updatedAt]      AS [Prescription.updatedAt]
				FROM [PrescriptionPrescribableDrugs] AS [PrescriptionPrescribableDrug]
								INNER JOIN [Prescriptions] AS [Prescription]
														ON [PrescriptionPrescribableDrug].[prescriptionId] = [Prescription].[prescriptionId]
				WHERE [PrescriptionPrescribableDrug].[prescriptionStartDate] <= :startDate AND [PrescriptionPrescribableDrug].[prescriptionEndDate] >= :endDate
					AND [PrescriptionPrescribableDrug].[prescribableId] = 1
					AND [Prescription].[patientId] = :patientId;
			`,
			{
				replacements: {patientId: req.params.patientId, startDate: req.body.prescriptionPrescribableDrug.prescriptionStartDate, endDate: req.body.prescriptionPrescribableDrug.prescriptionEndDate},
				type: QueryTypes.SELECT,
			}
		);
``
		if(prescriptionHistory.length === 0){
			const prescriptionPrescribableDrug = PrescriptionPrescribableDrug.build(req.body.prescriptionPrescribableDrug);
			const savedPrescriptionPrescribableDrug = await prescriptionPrescribableDrug.save();
			return {prescriptionPrescribableDrug: savedPrescriptionPrescribableDrug.dataValues};
		} else {
			await Prescription.destroy({
				where: {
					prescriptionId: req.body.prescriptionPrescribableDrug.prescriptionId,
				}
			});
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

exports.getPrescriptionPrescribableDrugCountForLastYear = async (req, reply) => {
	try {
		const prescriptionPrescribableDrugCount = await sequelize.query(
		`
			SELECT count(ppd.prescriptionId) as prescriptionCount, pp.name as prescribableName FROM PrescriptionPrescribableDrugs ppd
			JOIN Prescribables pp on pp.prescribableId = ppd.prescribableId
			JOIN Prescriptions p on p.prescriptionId = ppd.prescriptionId
			WHERE ppd.createdAt between :lastYearRolling and :today and p.patientId = :patientId
			GROUP BY pp.name
		`, 
		{
			replacements: {patientId: req.params.patientId, lastYearRolling: moment().subtract(1, 'year').toDate(), today: moment().toDate()},
			type: QueryTypes.SELECT,
		});
		return {data: prescriptionPrescribableDrugCount};
	} catch (err){
		throw boomify(err);
	}
}

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

exports.getCountOfPrescribablesPerDoctor = async (req, reply) => {
	try {
		const prescribablesPerDoctor = await sequelize.query(
			`
				SELECT count(ppd.createdAt) as numPrescriptions, 'Dr. ' + u.lastName as doctorName FROM PrescriptionPrescribableDrugs ppd
					JOIN Prescriptions p on p.prescriptionId = ppd.prescriptionId and p.patientId = :patientId
					JOIN Users u on u.id = p.doctorId
					WHERE p.createdAt between :lastYearRolling and :today
					GROUP BY u.lastName;
			`,
			{
				replacements: {patientId: req.params.patientId, lastYearRolling: moment().subtract(1, 'year').toDate(), today: moment().toDate()},
				type: QueryTypes.SELECT,
			}
		);

		return {data: prescribablesPerDoctor};
	} catch (err) {
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