const express = require("express")
const app = express();
const path = require("path");

app.listen(3000);

app.use("/site",express.static(path.join(__dirname,'public')))