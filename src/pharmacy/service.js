const { boomify } = require("boom");
const Pharmacy = require("./PharmacyModel");

exports.createPharmacy = async (req, reply) => {
  try {
    const pharmacy = Pharmacy.build(req.body.pharmacy);

    const savedPharmacy = await pharmacy.save();

    return { pharmacy: savedPharmacy.dataValues };
  } catch (err) {
    throw boomify(err);
  }
};

exports.deletePharmacy = async (req, reply) => {
  try {
    const pharmacyDeletedCount = await Pharmacy.destroy({
      where: {
        pharmacyId: req.params.id,
      },
    });

    if (pharmacyDeletedCount === 0) {
      return reply.code(404).send({
        msg: "Pharmacy could not be found",
      });
    }

    return reply.code(204).send();
  } catch (err) {
    throw boomify(err);
  }
};

exports.patchPharmacy = async (req, reply) => {
  try {
    if (Object.entries(req.body.pharmacy).length === 0) {
      const pharmacy = await Pharmacy.findOne({
        where: {
          pharmacyId: req.params.id,
        },
      });

      return { pharmacy: pharmacy.dataValues };
    }
    console.log(req.body.pharmacy);
    const updatedPharmacyCount = await Pharmacy.update(req.body.pharmacy, {
      where: {
        pharmacyId: req.params.id,
      },
      individualHooks: true,
    });

    if (updatedPharmacyCount[1].length === 0) {
      return reply.code(404).send();
    }

    const updatedPharmacy = await Pharmacy.findOne({
      where: {
        pharmacyId: req.params.id,
      },
    });

    return { pharmacy: updatedPharmacy.dataValues };
  } catch (err) {
    throw boomify(err);
  }
};

exports.getPharmacyWithFilter = async (req, reply) => {
  try {
    const pharmacies = await Pharmacy.findAll({
      where: req.query,
    });
    return { pharmacies: pharmacies.map((x) => x.dataValues) };
  } catch (err) {
    throw boomify(err);
  }
};
