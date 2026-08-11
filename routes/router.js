const{createalarm,getalarm,completealarm}=require("../controller/controller")
const express=require("express")
const route=express.Router()

route.post("/api/alarm",createalarm)
route.get("/api/alarm",getalarm)
route.put("/api/alarm/:id", completealarm);

module.exports=route