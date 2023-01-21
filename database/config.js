const mongoose = require('mongoose')
const dbConnection = async () =>{
 try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_CNN,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    })
    console.log("base de datos online");
 } catch (error) {
    console.log(error);
    throw new Error('Error inicializando el proceso en base de datos')
 }
}

module.exports={
    dbConnection
}