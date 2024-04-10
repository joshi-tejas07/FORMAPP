const mongoose=require('mongoose')
const RegisterSchema=new mongoose.Schema({
    name:String,
    date:String,
    email:String,
    password:String
})

const RegisterModel=mongoose.model("Registration",RegisterSchema)
module.exports = RegisterModel