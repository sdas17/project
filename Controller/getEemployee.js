const db = require("../Config/db")

const createEmployee = async (req, res) => {
try {
    console.log(req.body);
    const { employeename, email, phone, department } = req.body;
    console.log(employeename,email,phone,department);
    if (!employeename || !email || !phone || !department ) {
        return res.status(400).send({
          success: false,
          message: 'All fields are required: name, email, phone,department'
        });
      }
      const connection = await db;
      const [result] = await connection.query(
        "INSERT INTO employee.new_table (employeename, email, phone,department) VALUES (?, ?, ?, ?)",
        [employeename, email, phone, department]
      );
  
      res.status(201).send({
        success: true,
        message: 'Employee data created successfully',
        data: {
          id: result.insertId,
          employeename,
          email,
          phone,
          department,
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

}
module.exports ={createEmployee}