require("dotenv").config();
const express = require("express");
const app = express();
const sql = require("mssql");
const port = process.env.PORT || 3000;
const cors = require("cors");

const { sqlConfig } = require("./config/db");
const customers = require("./routes/customers");

app.use(express.json());
app.use(cors());
app.use("/customers", customers);

const dbConnect = async () => {
  try {
    await sql.connect(sqlConfig);
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  } catch (err) {
    console.log(err);
  }
};

dbConnect();
