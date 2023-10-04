'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Barang.hasMany(models.Transaksi, {
        foreignKey: 'ID_Barang',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  }
  Barang.init({
    Nama_Barang: DataTypes.STRING,
    Jenis_Barang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Barang',
  });
  return Barang;
};