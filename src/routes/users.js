const express = require('express');

const userController = require('../controller/users.js')
const route = express.Router();


// CREATE - POST 
route.post('/', userController.createNewUser);

// READ - GET
route.get('/', userController.getUser);

// UPDATE - PATCH
route.patch('/:id', userController.updateUser);

// DELETE - DELETE
route.delete('/:id', userController.deleteUser);

module.exports = route;