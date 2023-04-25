const mongoose = require('mongoose')
require('dotenv').config()

async function dbConncect(){
        mongoose.connect(
            process.env.DB_URL
        )
        .then(()=>{
            console.log("Db Connection successfull")
        })
        .catch((error) => {
            console.log("Unable to connect")
            console.log(error)
        })
}

module.exports = dbConncect