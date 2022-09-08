const express = require("express");
const dotenv = require("dotenv")
const app = express();

const PORT = 5000;



dotenv.config({ path: './config.env' });
require("./db/conn");


app.use(express.json());

app.get("/" , (req, res)=>{
    res.send("welcome to the server side");
})



app.listen(PORT , ()=>{
    console.log(`Server is listening to port ${PORT}`);
});
