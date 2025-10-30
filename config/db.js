const mongoose = require('mongoose')

//connection of MongoDB
 const ConnectDB = async ()=>{
try {
          const connect = await mongoose.connect(process.env.MONGO_URI)
          console.log("Mongoose connected Successfully")
}
catch (error) {
        console.error('connection error',error)
        }
}

module.exports = ConnectDB;
