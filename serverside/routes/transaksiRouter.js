const router = require("express").Router()
const { transaksiController } = require("../controllers")

router.post("/", transaksiController.createTransaksi)
router.get("/", transaksiController.getAllTransaksi)
router.get("/most-sold", transaksiController.getMostSold)
router.get("/least-sold", transaksiController.leastSold)
router.get("/filter-by-date", transaksiController.filterByDate)
router.patch("/:id", transaksiController.updateTransaksi)
router.delete("/:id", transaksiController.deleteTransaksi)


module.exports = router