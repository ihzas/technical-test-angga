const router = require("express").Router()
const { transaksiController } = require("../controllers")

router.post("/", transaksiController.createTransaksi)
router.get("/", transaksiController.getAllTransaksi)
router.patch("/:id", transaksiController.updateTransaksi)
router.delete("/:id", transaksiController.deleteTransaksi)

router.get("/most-sold", transaksiController.getMostSold);
router.get("/least-sold", transaksiController.getLeastSold);


module.exports = router