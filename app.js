const express = require("express");
const app = express();
const dotenv = require("dotenv");
var mongoose = require("mongoose"); 
const cors = require("cors");

dotenv.config();
var url = process.env.DB_CONNECT;

// import routes
const userRoutes = require("./routes/user");

// Middlewares
app.use(express.json());
app.use(cors());

// route middleware
app.use("/api/user",userRoutes);

// connect to db
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology:true}, function(err,db) 
{ 
     console.log("DB Connected"); 
});

// express server
app.listen(4000, () => console.log("server up and running on port 4000"))