const express = require('express');
const {createEmployee} = require('../Controller/getEemployee')
let routing =express.Router();
routing.post("/create",createEmployee)

module.exports =routing
