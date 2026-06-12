const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAll)
  .post(userController.create);

router
  .route('/:id')
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
