const express = require("express");
const app = express();
require("express-async-errors");
const mongooose = require("mongoose");
const bodyParser = require("body-parser");
const morgan  = require("morgan");

// database connection
require("./mongo")

//Models
require("./model/Post");
require("./model/Comment");

//Middleware
app.use(bodyParser.json()).use(morgan());

// Routes
app.use("/posts",require("./routes/posts"));

//Not found Route
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("Routes not found");
    next(error);
})

// Error handler

if(app.get("env") === "production"){
    app.use((error, req, res, next) => {
        res.status(req.status || 500).send(({
            message: error.message
        }));
    });
}
app.use((error, req, res, next) => {
res.status(req.status || 500).send(({
    message: error.message,
    stack: error.stack
}))
})
app.listen(5000, function(){
    console.log("server is working14");
})