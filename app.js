const express = require("express");
const app = express();

// dotenv configuration requiring
require("dotenv").config()

// DB connection requireing and running
const connectToDb = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser"); // requiring cookie parser


// middleware requireing
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

connectToDb()   // running connect-to-db to connect to the database


app.get("/", function(req, res) {
    res.send("Hello World!");
})


app.listen(3000, function() {
    console.log("Server started on port 3000");
});