const mongoose = require("mongoose");
require("dotenv").config();
const mongoDBErrors = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;
//console.log(process.env.MONGOURI);
//console.log(process.env.NAME);
mongoose.plugin(mongoDBErrors);
mongoose.connect(process.env.MONGOURI);

