const express = require("express");
const dotenv = require("dotenv");
const cors =require('cors');
const { connectedDb } = require("./Config/db");
dotenv.config();

const app = express();
//connection
connectedDb();

//middleware
app.use(cors());
app.use(express.json());

app.get("/get", (req, res) => {
    res.send("Welcome");
});

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not set

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
