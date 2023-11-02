const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const boardRouter = require("./routes/boardRoute");
const taskRouter=require("./routes/taskRoute")
const subTaskRouter=require("./routes/subTaskRoute")
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/board", boardRouter);
app.use("/task", taskRouter);
app.use('/subtask', subTaskRouter);




app.listen(process.env.port,async ()=>{
    try {
        await connection;
        console.log("connected to db");
        console.log(`Running on ${process.env.port}`)
    } catch (error) {
        console.log({err:error.message});
    }
})