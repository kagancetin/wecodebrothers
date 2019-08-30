const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/WcodeBrothers", {
    useNewUrlParser: true
});


const app = express();
app.use(helmet());

//Routes

const index = require("./router/page/index.js");
const admin = require("./router/admin/admin.js");
const adminBlog = require("./router/admin/blog.js");


//Middlewares

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(logger("dev"));

app.set("view engine", "ejs");


//Routes
app.use("/", index);
app.use("/admin/blog", adminBlog);
app.use("/admin", admin);






//Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    //Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    //Respond to ourselves
    console.error(err);
});

//Start the server
const port = app.get("port") || 3000;
app.listen(port, () => console.log("Server is listenning on port " + port));