const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const userAuth = require("./routes/auth");
const postAuth = require("./routes/posts");
const configDB = require('./database.js')

const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', false);

dotenv.config();



mongoose.connect(configDB.url)
.then( () => console.log("connected to DB."))
.catch( err => console.log(err)); 

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",userAuth );
app.use("/api/posts",postAuth );




app.listen(8800,()=>{
    console.log("Backend server is running!")
})