const express = require("express");
const dotenv = require("dotenv");
const mysqlconnection = require('./Config/db');
const cors =require('cors');
const colors = require('colors');

dotenv.config();

const app = express();
//connection

// Use routes


//middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/creattEmployee", require("../project/Routes/Eemployee")); // Ensure the path is correct


const PORT = process.env.PORT || 3000; 

mysqlconnection.then((connection) => {
    return connection.query('SELECT 1');
  })
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log('Server started'.bgMagenta.white); 
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });