'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Barangs", [
      {
        Nama_Barang: "Kopi",
        Jenis_Barang: "Konsumsi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Nama_Barang: "Teh",
        Jenis_Barang: "Konsumsi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Nama_Barang: "Kopi",
        Jenis_Barang: "Konsumsi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Nama_Barang: "Pasta Gigi",
        Jenis_Barang: "Pembersih",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Nama_Barang: "Sabun Mandi",
        Jenis_Barang: "Pembersih",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Nama_Barang: "Sampo",
        Jenis_Barang: "Pembersih",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Nama_Barang: "Teh",
        Jenis_Barang: "Konsumsi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Barangs", null, {});
  }
};
