const express = require("express");
const app = express();
const PORT = 8000;

const {connectMongoDb} = require('./connection');
const userRouter = require('./routes/user')


//Connection
connectMongoDb('mongodb://127.0.0.1:27017/LearningNode')

//Middleware - plugin
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/', userRouter)




app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

