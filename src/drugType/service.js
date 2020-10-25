const DrugType = require("./DrugTypeModel");
const { boomify } = require("boom");

exports.getDrugTypeWithFilter = async (req, reply) => {
  try {
    const drugTypes = await DrugType.findAll({
      where: req.query,
    });

    return { drugTypes: drugTypes.map((x) => x.dataValues) };
  } catch (err) {
    throw boomify(err);
  }
};
