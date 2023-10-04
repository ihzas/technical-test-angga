const express = require("express")
const db = require("./models");

const cors = require("cors")
const app = express()
const PORT = 8000

app.use(express.json())
app.use(cors())

const { transaksiRouter } = require("./routes")

app.use("/transaksi", transaksiRouter)


app.listen(PORT, () => {
    // db.sequelize.sync({ alert: true });
    console.log(`Server running at port ${PORT}`);
})