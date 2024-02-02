const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const getStartupData = require('./routes/get-routes/getStartupData')
const getAllStartupsData = require('./routes/get-routes/getAllStartupData')
const checkInvestorPassword = require('./routes/post-routes/checkInvestorpassword')
const checkStartUpPassword = require('./routes/post-routes/checkStartupPassword')
app.use(checkStartUpPassword)
app.use(getStartupData)
app.use(checkInvestorPassword)
app.use(getAllStartupsData)

const addInvestor = require('./routes/post-routes/addInvestor')
const addStartup = require('./routes/post-routes/addStartup')
const updateSales = require('./routes/post-routes/updateSales')
app.use(addInvestor)
app.use(addStartup)
app.use(updateSales)

const dbName = "Fundrev";
mongoose
.connect(process.env.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: dbName,
})
.then(() => {
  console.log("Database connected");
})
.catch((error) => {
  console.log(error);
});


//Running on the port
const port = process.env.port||5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
