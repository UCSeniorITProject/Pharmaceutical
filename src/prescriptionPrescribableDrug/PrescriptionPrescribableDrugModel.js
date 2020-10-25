const SequelizeInstance = require("../dbConnection");
const Sequelize = require("sequelize");
const activeEnum = require("../constants/activeEnum");

const PrescriptionPrescribableDrug = SequelizeInstance.define(
  "PrescriptionPrescribableDrug",
  {
    prescriptionPrescribableDrugId: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prescriptionId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Prescriptions",
        key: "prescriptionId",
      },
    },
    prescribableId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Prescribables",
        key: "prescribableId",
      },
    },
    prescriptionStartDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    prescriptionEndDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    active: {
      type: Sequelize.DataTypes.STRING,
      values: activeEnum,
    },
  }
);

module.exports = PrescriptionPrescribableDrug;
``;
