const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const RegisterModel=require('./models/db')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(
    "mongodb://localhost:27017/Registration",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }
  );

  app.post('/login',(req,res)=>{
    const {name,password}=req.body;
    RegisterModel.findOne({name:name})
    .then(user =>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("The user not exist")
        }
    })
  })

  app.post('/register',(req, res)=>{
     RegisterModel.create(req.body)
     .then(register=>res.json(register))
     .catch(err=>res.json(err))
  })
  
  // Check connection
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
  
  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
