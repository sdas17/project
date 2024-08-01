sql how to data is connected
====================================================
const mysql = require('mysql2/promise');
const mysqlconnection = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: 'password',   
    database: 'student_db'    
  });
  module.exports =mysqlconnection;
  ====================================================
   than next  controller here all busginess logic are their
   const db = require("../config/db")
const getStudents=async(req,res)=>{
    try {
        const connection = await db; 
    const [data] = await connection.query("SELECT * FROM new_table");
        console.log(data);
        if (!data) {
            return res.status(404).send({
                sucess:false,
                message:'No Records founds'
            })
        }
        res.status(200).send({
                    sucess:true,
                message:'All Student Records',
                data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess:false,
            message:'Error in get all student api',
            error
        })
    }

}
const getStudentsById=async(req,res)=>{
    try {
        const studentId = req.params.id; // Corrected to params
        console.log(studentId);
    
        if (!studentId) {
          return res.status(400).send({
            success: false,
            message: 'Student ID is required'
          });
        }
    
        const connection = await db; 
        const [data] = await connection.query("SELECT * FROM new_table WHERE id = ?", [studentId]);
    
        if (data.length === 0) {
          return res.status(404).send({
            success: false,
            message: 'No student found with the given ID'
          });
        }
    
        res.status(200).send({
          success: true,
          message: 'Student data retrieved successfully',
          data: data[0]
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: 'Error in retrieving student data',
          error
        });
      }
    };

    const createStudentById = async (req, res) => {
        try {
          const { Studentname, fees, Class, Rollno, medium } = req.body;
          console.log(Studentname,fees,Rollno,medium,Class);
      
          if (!Studentname || !fees || !Class || !Rollno || !medium) {
            return res.status(400).send({
              success: false,
              message: 'All fields are required: Studentname, fees, Class, Rollno, medium'
            });
          }
      
          const connection = await db;
      
          const [result] = await connection.query(
            "INSERT INTO new_table (Studentname, fees, Class, Rollno, medium) VALUES (?, ?, ?, ?, ?)",
            [Studentname, fees, Class, Rollno, medium]
          );
      
          res.status(201).send({
            success: true,
            message: 'Student data created successfully',
            data: {
              id: result.insertId,
              Studentname,
              fees,
              Class,
              Rollno,
              medium
            }
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: 'Error in creating student data',
            error
          });
        }
      };
      const updateStudent = async (req, res) => {
        try {
          const studentId = req.params.id;
      
          const { Studentname, fees, Class, Rollno, medium } = req.body;
      
          if (!Studentname || !fees || !Class || !Rollno || !medium) {
            return res.status(400).send({
              success: false,
              message: 'All fields are required: Studentname, fees, Class, Rollno, medium'
            });
          }
      
          const connection = await db;
      
          const [result] = await connection.query(
            "UPDATE new_table SET Studentname = ?, fees = ?, Class = ?, Rollno = ?, medium = ? WHERE id = ?",
            [Studentname, fees, Class, Rollno, medium, studentId]
          );
      
          if (result.affectedRows === 0) {
            return res.status(404).send({
              success: false,
              message: 'Student record not found'
            });
          }
      
          res.status(200).send({
            success: true,
            message: 'Student data updated successfully'
          });
      
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: 'Error in updating student data',
            error
          });
        }
      };
      const deleteStudent = async (req, res) => {
        try {
          // Extract studentId from URL parameters
          const studentId = req.params.id;
      
          // Validate the presence of studentId
          if (!studentId) {
            return res.status(400).send({
              success: false,
              message: 'Student ID is required'
            });
          }
      
          // Get a connection from the pool
          const connection = await db;
      
          // SQL query to delete student record
          const [result] = await connection.query("DELETE FROM new_table WHERE id = ?", [studentId]);
      
          // Check if any rows were affected
          if (result.affectedRows === 0) {
            return res.status(404).send({
              success: false,
              message: 'Student record not found'
            });
          }
      
          // Respond with success message
          res.status(200).send({
            success: true,
            message: 'Student data deleted successfully'
          });
      
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: 'Error in deleting student data',
            error
          });
        }
      };

module.exports ={getStudents,getStudentsById,createStudentById,updateStudent,deleteStudent}
=============================================================================================================

how to connected routing
================================
const express = require('express');
const {getStudents,getStudentsById,createStudentById,updateStudent,deleteStudent} = require('../Controller/getAllData')

 let routing =express.Router();
 routing.get("/getalldata",getStudents)
 routing.get("/getalldata/:id",getStudentsById)
 routing.post("/createnewRecords",createStudentById)

 //update records
 routing.put("/updateStudentRecords/:id",updateStudent)
 //delete records
 routing.delete("/updateStudentRecords/:id",deleteStudent)


 module.exports =routing


===============================

how to connected server.js
===============================
const colors = require('colors');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysqlconnection = require('./config/db'); // Ensure the path is correct
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
// Use routes
app.use("/api/v1/student", require("./Routes/StudentRoutes")); // Ensure the path is correct
// Routing
// app.get("/getdata", (req, res) => {
//   let data = [
//     { name: 'subham', kumar: 'das' }
//   ];
//   res.send(data);
// });

// Set the port
const PORT = process.env.PORT || 8080;
console.log(PORT);

mysqlconnection.then((connection) => {
  return connection.query('SELECT 1');
})
.then(() => {
  console.log('Database connection successful');
  app.listen(PORT, () => {
    console.log('Server started'.bgMagenta.white); // Outputs magenta text on a white background
  });
})
.catch((err) => {
  console.error('Error connecting to the database:', err);
});
 ok suppose go for data is go for congif is just for database connection and next all business logic controller and 
