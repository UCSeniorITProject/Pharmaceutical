const Drug = require('./DrugModel');
const {boomify} = require('boom');

exports.createDrug = async () => {
  try {
    const drug = Drug.build(req.body.drug);

    const savedDrug = await drug.save();
    return {drug: savedDrug.dataValues};
  } catch (err) {
    throw boomify(err);
  }
};

exports.deleteDrug = async () => {
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

exports.patchDrug = async () => {
  try {
    if(Object.entries(req.body.drug).length === 0){
      const drug = await Drug.findOne({where: {
        id: req.params.id,
      }});

      return {drug: drug.dataValues}
    }
  } catch (err) {
    boomify(err);
  }
};

exports.getDrugList = async () => {
  try {
    const drugs = await Drug.findAll();

    return {drugs: drugs.map(e => e.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
}

exports.getDrugWithFilter = async () => {
  try {
    const drugs = await Drug.findAll({
      wheree: req.query,
    });

    return {drugs: drugs.map(x=>x.dataValues)};
  } catch (err) {
    throw boomify(err);
  }
}
