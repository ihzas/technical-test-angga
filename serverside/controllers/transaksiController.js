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
            const { search, sortBy, sortName } = req.query;

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

            const orderCondition = [];

            if (sortBy) {
                orderCondition.push(['Tanggal_Transaksi', sortBy === 'asc' ? 'ASC' : 'DESC']);
            }

            if (sortName) {
                orderCondition.push([Sequelize.literal('`Barang.Nama_Barang` ' + sortName)]);
            }

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
            const { category, startDate, endDate } = req.query;

            const dateCondition = startDate && endDate ? {
                Tanggal_Transaksi: {
                    [Op.between]: [startDate, endDate],
                },
            } : {};

            const categoryCondition = category ? {
                '$Barang.Jenis_Barang$': category,
            } : {};

            const mostSold = await Transaksi.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('Jumlah_Terjual')), 'totalTerjual'],
                    [Sequelize.col('Barang.id'), 'BarangId'],
                    [Sequelize.col('Barang.Nama_Barang'), 'Nama_Barang'],
                    [Sequelize.col('Barang.Jenis_Barang'), 'Jenis_Barang'],
                    [Sequelize.col('Tanggal_Transaksi'), 'Tanggal_Transaksi'],
                ],
                include: [{ model: Barang }],
                group: ['Barang.id', 'Barang.Nama_Barang', 'Barang.Jenis_Barang', 'Tanggal_Transaksi'],
                where: {
                    ...dateCondition,
                    ...categoryCondition,
                },
                order: [[Sequelize.literal('totalTerjual'), 'DESC']],
            });

            res.status(200).json(mostSold);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    },

    getLeastSold: async (req, res) => {
        try {
            const { category, startDate, endDate } = req.query;

            const dateCondition = startDate && endDate ? {
                Tanggal_Transaksi: {
                    [Op.between]: [startDate, endDate],
                },
            } : {};

            const mostSold = await Transaksi.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('Jumlah_Terjual')), 'totalTerjual'],
                    [Sequelize.col('Barang.id'), 'BarangId'],
                    [Sequelize.col('Barang.Nama_Barang'), 'Nama_Barang'],
                    [Sequelize.col('Barang.Jenis_Barang'), 'Jenis_Barang'],
                    [Sequelize.col('Tanggal_Transaksi'), 'Tanggal_Transaksi'],
                ],
                include: [{ model: Barang }],
                group: ['Barang.id', 'Barang.Nama_Barang', 'Barang.Jenis_Barang', 'Tanggal_Transaksi'],
                where: {
                    ...dateCondition,
                    '$Barang.Jenis_Barang$': category,
                },
                order: [[Sequelize.literal('totalTerjual'), 'ASC']],
            });

            res.status(200).json(mostSold);
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

            // if (deletedTransaksi === 1) {

            //     await Barang.destroy({
            //         where: { id: existingTransaksi.ID_Barang },
            //     });

            res.status(200).json("Transaksi deleted successfully");
            // } else {
            //     res.status(404).json("Transaksi not found");
            // }
        } catch (error) {
            console.log(error);
            res.status(500).json("Failed to delete transaksi")
        }
    }
}