const mongoose = require('mongoose');

async function connectMongoDb(url){
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDb,
}






// mongoose
//     .connect("mongodb://127.0.0.1:27017/LearningNode")
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log("Mongo Error: ", err));