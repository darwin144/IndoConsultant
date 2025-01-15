'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Portfolio.hasMany(models.Output, { foreignKey: "PortfolioId",  onDelete: 'CASCADE'  })
      Portfolio.hasMany(models.Carousel, { foreignKey: "PortfolioId",  onDelete: 'CASCADE'  })
      Portfolio.hasMany(models.Ruanglingkup, { foreignKey: "PortfolioId",  onDelete: 'CASCADE'  })
    }
  }
  Portfolio.init({
    judul: DataTypes.STRING,
    isi: DataTypes.TEXT,
    lingkupPekerjaan: DataTypes.TEXT,
    gambar: DataTypes.STRING,
    divisi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};