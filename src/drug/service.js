const Drug = require('./DrugModel');
const {boomify} = require('boom');

exports.createDrug = async (req, reply) => {
  try {
    const drug = Drug.build(req.body.drug);

    const savedDrug = await drug.save();
    return {drug: savedDrug.dataValues};
  } catch (err) {
    throw boomify(err);
  }
};

exports.deleteDrug = async (req, reply) => {
  try {
    const deletedDrugCount = await Drug.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(deletedDrugCount === 0){
      return reply
                .code(404)
                .send({
                  msg: 'Drug could not be found',
                });
    }

    return reply
              .code(204)
              .send();
  } catch (err) {
    throw boomify(err);
  }
};

exports.patchDrug = async (req, reply) => {
  try {
    if(Object.entries(req.body.drug).length === 0){
      const drug = await Drug.findOne({where: {
        id: req.params.id,
      }});

      return {drug: drug.dataValues}
    }

    const updatedDrugCount = await Drug.update(
      req.body.drug,
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      },
    );

    if(updatedDrugCount[1].length === 0){
      return reply
                .code(404)
                .send();
    }

    const updatedDrug = await Drug.findOne({
      where: {
        id: req.params.id,
      }
    });

    return {user: updatedDrug.dataValues};
  } catch (err) {
    boomify(err);
  }
};

exports.getDrugList = async (req, reply) => {
  try {
    const drugs = await Drug.findAll();

    return {drugs: drugs.map(e => e.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
}

exports.getDrugWithFilter = async (req, reply) => {
  try {
    const drugs = await Drug.findAll({
      wheree: req.query,
    });

    return {drugs: drugs.map(x=>x.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
}

