
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const MONGO_CONNECTION_STRING= "mongodb+srv://techie:techie@cluster0.w5hqwuk.mongodb.net/?retryWrites=true&w=majority"

const PORT=process.env.PORT || 3001
const Auth=require('./Routes/auth')

app.use(cors())
// app.use(express.bodyParser())
app.use(express.json())
app.use('/auth',Auth)


mongoose.connect(MONGO_CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        app.listen(PORT,err=>{
            if(err){
                console.log("Server crashed, Error is "+err)
            }
            else{
                console.log("Server running under port"+PORT)
            }
        })
    })
    .catch((error)=>{console.log(error)});