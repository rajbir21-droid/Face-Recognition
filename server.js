const express= require('express');
const app=express();
const dotenv=require("dotenv");
const connectDB= require('./db/conn');
const path = require('path');
const authRoute = require('./routes/auth');
const imageRoute = require('./routes/image');
const cors=require('cors');
dotenv.config({path:'./config.env'});
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoute);
app.use("/api/image",imageRoute);

if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,"/facerecognitionbrain/build")))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"facerecognitionbrain","build","index.html"));
  })
}
app.get('/', (req, res) => { 
  res.send('Hello from Express!')
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`backend is running at ${port}`);
  });