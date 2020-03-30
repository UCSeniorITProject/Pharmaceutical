const {boomify} = require('boom');
const Prescribable = require('./PrescribableModel');
const sequelize = require('../dbConnection');
const {QueryTypes} = require('sequelize');
const moment = require('moment');
exports.createPrescribable = async (req, reply) => {
  try {
    const prescribable = Prescribable.build(req.body.prescribable);

    const savedPrescribable = await prescribable.save();
    return {prescribable: savedPrescribable.dataValues};
  } catch (err) {
    throw boomify(err);
  }
}

exports.deletePrescribable = async (req, reply) => {
  try {
    const prescribableDeletedCount = await Prescribable.destroy({
      where: {
        prescribableId: req.params.id,
      },
    });

    if(prescribableDeletedCount === 0){
      return reply
                .code(404)
                .send({
                  msg: 'Prescribable could not be found',
                });
    }

    return reply
              .code(204)
              .send();
  } catch (err) {
    throw boomify(err);
  }
};

exports.patchPrescribable = async (req,  reply) => {
  try {
    if(Object.entries(req.body.prescribable).length === 0){
      const prescribable = await Prescribable.findOne({
        where: {
          prescribableId: req.params.id,
        }
      });

      return {prescribable: prescribable.dataValues};
    }

    const updatedPrescribableCount = await Prescribable.update(
      req.body.prescribable,
      {
        where: {
          prescribableId: req.params.id,
        },
        individualHooks: true,
      }
    );

    if(updatedPrescribableCount[1].length === 0){
      return reply
                .code(404)
                .send();
    }

    const updatedPrescribable = await Prescribable.findOne({
      where: {
        prescribableId: req.params.id,
      },
    });

    return {prescribable: updatedPrescribable.dataValues};
  } catch (err)  {
    throw boomify(err);
  }
};

exports.getPrescribableList = async () => {
  try {
    const prescribable = await Prescribable.findAll();

    return {prescribable: prescribable.map(e => e.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
}

exports.getPrescribableWithFilter = async (req, reply) => {
  try {
    const prescribables = await Prescribable.findAll(
      {
        where: req.query,
      }
    );

    return {prescribables: prescribables.map(x => x.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getNumPrescribablesPerMonth = async (req, reply) => {
	try {
		const prescribablesPerMonth = await sequelize.query(
			`
				DECLARE @StartDate DATETIME2, @EndDate DATETIME2;

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
								numPrescribables = COUNT(p.prescriptionId)
				FROM d LEFT JOIN dbo.PrescriptionPrescribableDrugs AS p
						ON p.createdAt >= d.d and p.createdAt <= DATEADD(MONTH, 1, d.d)
				LEFT JOIN Prescriptions pp on pp.prescriptionId = p.prescriptionId and pp.patientId=:patientId
				GROUP BY d.d
				ORDER BY d.d;
			`,
			{
				replacements: {patientId: req.params.patientId, lastYearRolling: moment().subtract(1, 'year').toDate(), today: moment().toDate()},
				type: QueryTypes.SELECT,
			}
		);

		return {data: prescribablesPerMonth};
	} catch (err){
		throw boomify(err)
	}
}