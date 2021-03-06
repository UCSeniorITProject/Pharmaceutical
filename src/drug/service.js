const Drug = require("./DrugModel");
const { boomify } = require("boom");

exports.createDrug = async (req, reply) => {
  try {
    const drug = Drug.build(req.body.drug);
    const savedDrug = await drug.save();
    return { drug: savedDrug.dataValues };
  } catch (err) {
    throw boomify(err);
  }
};

exports.bulkInsertDrug = async (req, reply) => {
  try {
    console.log(req.body);
    const drugs = await Drug.bulkCreate(req.body.drugs);
    return { drugs: drugs.map((x) => x.dataValues) };
  } catch (err) {
    console.log(err.message);
    throw boomify(err);
  }
};

exports.deleteDrug = async (req, reply) => {
  try {
    const deletedDrugCount = await Drug.destroy({
      where: {
        drugId: req.params.id,
      },
    });

    if (deletedDrugCount === 0) {
      return reply.code(404).send({
        msg: "Drug could not be found",
      });
    }

    return reply.code(204).send();
  } catch (err) {
    throw boomify(err);
  }
};

exports.patchDrug = async (req, reply) => {
  try {
    if (Object.entries(req.body.drug).length === 0) {
      const drug = await Drug.findOne({
        where: {
          drugId: req.params.id,
        },
      });

      return { drug: drug.dataValues };
    }

    const updatedDrugCount = await Drug.update(req.body.drug, {
      where: {
        drugId: req.params.id,
      },
      individualHooks: true,
    });

    if (updatedDrugCount[1].length === 0) {
      return reply.code(404).send();
    }

    const updatedDrug = await Drug.findOne({
      where: {
        drugId: req.params.id,
      },
    });

    return { user: updatedDrug.dataValues };
  } catch (err) {
    boomify(err);
  }
};

exports.getDrugList = async (req, reply) => {
  try {
    const drugs = await Drug.findAll();

    return { drugs: drugs.map((e) => e.dataValues) };
  } catch (err) {
    throw boomify(err);
  }
};

exports.getDrugWithFilter = async (req, reply) => {
  try {
    let idsQuery;
    if (req.query.ids && req.query.ids.length > 0) {
      idsQuery = {
        $in: req.query.ids,
      };
      delete req.query.ids;
    }
    const drugs = await Drug.findAll({
      where: req.query,
      ...idsQuery,
    });

    return { drugs: drugs.map((x) => x.dataValues) };
  } catch (err) {
    throw boomify(err);
  }
};
