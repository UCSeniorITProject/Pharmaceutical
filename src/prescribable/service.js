const {boomify} = require('boom');
const Prescribable = require('./PrescribableModel');

exports.createPrescribable = async (req, reply) => {
  try {
    const prescribable = new Prescribable.build(req.body.prescribable);

    const savedPrescribable = await prescribable.save();
    return {prescribable: prescribable.dataValues};
  } catch (err) {
    throw boomify(err);
  }
}

exports.deletePrescribable = async (req, reply) => {
  try {
    const prescribableDeletedCount = await Prescribable.destroy({
      where: {
        id: req.params.id,
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
    if(Object.entriies(req.body.prescribable).length === 0){
      const prescribable = await Prescribable.findOne({
        where: {
          id: req.params.id,
        }
      });

      return {prescribable: prescribable.dataValues};
    }

    const updatedPrescribableCount = await prescribable.update(
      req.body.prescribable,
      {
        where: {
          id: req.params.id,
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
        id: req.params.id,
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

exports.getPrescribableWithFilter = async () => {
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
}