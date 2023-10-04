'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Transaksis", [
      {
        Stok: 100,
        Jumlah_Terjual: 10,
        Tanggal_Transaksi: "2021-05-01",
        ID_Barang: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Stok: 100,
        Jumlah_Terjual: 19,
        Tanggal_Transaksi: "2021-05-05",
        ID_Barang: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Stok: 90,
        Jumlah_Terjual: 15,
        Tanggal_Transaksi: "2021-05-10",
        ID_Barang: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Stok: 100,
        Jumlah_Terjual: 20,
        Tanggal_Transaksi: "2021-05-11",
        ID_Barang: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Stok: 100,
        Jumlah_Terjual: 30,
        Tanggal_Transaksi: "2021-05-11",
        ID_Barang: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Stok: 100,
        Jumlah_Terjual: 25,
        Tanggal_Transaksi: "2021-05-12",
        ID_Barang: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Stok: 81,
        Jumlah_Terjual: 5,
        Tanggal_Transaksi: "2021-05-12",
        ID_Barang: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Transaksis", null, {});
  }
};
