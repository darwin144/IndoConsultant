'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Output extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Output.belongsTo(models.Portfolio, { foreignKey: "PortfolioId" });
    }
  }
  Output.init({
    PortfolioId: DataTypes.INTEGER,
    isi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Output',
  });
  return Output;
};