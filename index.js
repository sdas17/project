const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get("/get", (req, res) => {
    res.send("Welcome");
});

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not set

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
