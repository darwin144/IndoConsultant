'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ruanglingkup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ruanglingkup.belongsTo(models.Portfolio, { foreignKey: "PortfolioId" });
    }
  }
  Ruanglingkup.init({
    PortfolioId: DataTypes.INTEGER,
    isi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ruanglingkup',
  });
  return Ruanglingkup;
};