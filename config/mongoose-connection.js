const mongoose = require("mongoose")

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Db");
    }
    catch(err){
        console.error("MongoDb connection error: ", err );
        process.exit(1) // isse pura application yhin se exit le lega aur aage kaam nhi krega
    }
    
}


module.exports = connectDb;