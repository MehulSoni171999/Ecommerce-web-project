const mongoose =require("mongoose");
const plm =require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/ecommerce");

const userSchema=mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    
})

userSchema.plugin(plm);
module.exports=mongoose.model("users",userSchema);