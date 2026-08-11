const express=require("express")
const path=require("path")
const app=express();
const mongoose=require("mongoose")

const authroute=require("./routes/router")
require("dotenv").config();

const session = require("express-session");
const passport = require("passport");

require("./config/passport");


app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());

app.use(passport.session());
mongoose.connect("mongodb://127.0.0.1:27017/alarmapp")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});
let alarms=[]

app.use("/",authroute)

app.use(express.static(path.join(__dirname, "public")));


app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "home.html"));
});

// Alarm page
app.get("/alarm", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "alarm.html"));
});

// Timer page
app.get("/timer", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "timer.html"));
});

app.get("/detect",(req,res)=>{
    res.sendFile(path.join(__dirname,"view","detect.html"))
})

// app.get("/api/alarm",(req,res)=>{
//     res.json(alarms);
// })

// app.post("/api/alarm",(req,res)=>{
// const time=req.body.time
// alarms.push({
//     time
// });
// res.json({
//     message:"alaram saved succesfull",
//     alarms:alarms
// });
// });

app.listen(3000,()=>{
    console.log("server is running")
})