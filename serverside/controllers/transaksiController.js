const { Op } = require("sequelize");
const { Sequelize } = require("../models")
const db = require("../models")
const Transaksi = db.Transaksi
const Barang = db.Barang;


module.exports = {
    createTransaksi: async (req, res) => {
        const { Stok, Jumlah_Terjual, Tanggal_Transaksi, Nama_Barang, Jenis_Barang } = req.body
        try {

            const barang = await Barang.create({
                Nama_Barang,
                Jenis_Barang,
            })

            await Transaksi.create({
                Stok,
                Jumlah_Terjual,
                Tanggal_Transaksi,
                ID_Barang: barang.id
            })

            res.status(200).json("Success create transaksi")

        } catch (error) {
            console.log(error);
        }
    },
    getAllTransaksi: async (req, res) => {
        try {
            const { search, sortBy } = req.query;

            const searchCondition = search
                ? {
                    [Op.or]: [
                        {
                            '$Barang.Nama_Barang$': {
                                [Op.like]: `%${search}%`,
                            },
                        },
                    ],
                }
                : {};

            const orderCondition = sortBy
                ? [['Tanggal_Transaksi', sortBy === 'asc' ? 'ASC' : 'DESC']]
                : [];

            const transaksiList = await Transaksi.findAll({
                include: [{ model: Barang, as: 'Barang' }],
                where: searchCondition,
                order: orderCondition,
            });


            res.status(200).json(transaksiList);
        } catch (error) {
            console.log(error);
            res.status(500).json("Failed to fetch transaksi")
        }
    },
    getMostSold: async (req, res) => {
        try {
            const mostSold = await Transaksi.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('Jumlah_Terjual')), 'totalTerjual'],
                ],
                include: [{ model: Barang, as: 'Barang' }],
                group: ['Barang.Jenis_Barang'],
                order: [[Sequelize.literal('totalTerjual'), 'DESC']],
            });

            res.status(200).json(mostSold);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    },
    leastSold: async (req, res) => {
        try {
            const leastSold = await Transaksi.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('Jumlah_Terjual')), 'totalTerjual'],
                ],
                include: [{ model: Barang, as: 'Barang' }],
                group: ['Barang.Jenis_Barang'],
                order: [[Sequelize.literal('totalTerjual'), 'ASC']],
            });

            res.status(200).json(leastSold);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    },
    filterByDate: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            const transactions = await Transaksi.findAll({
                where: {
                    Tanggal_Transaksi: {
                        [Sequelize.Op.between]: [startDate, endDate],
                    },
                },
                include: [{ model: Barang, as: 'Barang' }],
            });

            res.status(200).json(transactions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    },
    updateTransaksi: async (req, res) => {
        const { id } = req.params;
        const { Stok, Jumlah_Terjual, Tanggal_Transaksi, Nama_Barang, Jenis_Barang } = req.body;
        try {
            const existingTransaksi = await Transaksi.findByPk(id);

            if (!existingTransaksi) {
                res.status(404).json("Transaksi not found");
                return;
            }

            await existingTransaksi.update({
                Stok,
                Jumlah_Terjual,
                Tanggal_Transaksi,
            });

            if (Nama_Barang || Jenis_Barang) {
                const existingBarang = await Barang.findByPk(existingTransaksi.ID_Barang);

                if (!existingBarang) {
                    res.status(404).json("Barang not found");
                    return;
                }

                await existingBarang.update({
                    Nama_Barang,
                    Jenis_Barang,
                });
            }

            res.status(200).json("Transaksi and Barang updated successfully");
        } catch (error) {
            console.log(error);
            res.status(500).json("Failed to update transaksi and/or barang");
        }
    },
    deleteTransaksi: async (req, res) => {
        const { id } = req.params;
        try {
            const existingTransaksi = await Transaksi.findByPk(id);

            if (!existingTransaksi) {
                res.status(404).json("Transaksi not found");
                return;
            }

            const deletedTransaksi = await Transaksi.destroy({
                where: { id },
            });

            if (deletedTransaksi === 1) {

                await Barang.destroy({
                    where: { id: existingTransaksi.ID_Barang },
                });

                res.status(200).json("Transaksi deleted successfully");
            } else {
                res.status(404).json("Transaksi not found");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Failed to delete transaksi")
        }
    }
}