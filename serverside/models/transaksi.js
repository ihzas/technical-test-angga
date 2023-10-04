'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaksi.belongsTo(models.Barang, {
        foreignKey: 'ID_Barang',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Transaksi.init({
    Stok: DataTypes.INTEGER,
    Jumlah_Terjual: DataTypes.INTEGER,
    Tanggal_Transaksi: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaksi',
  });
  return Transaksi;
};