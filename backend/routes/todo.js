const express = require('express');
const { Todo } = require("../db"); 
const { authenticateJwt } = require("../middleware/user"); 
const { todoPost, todoGet, todoPut } = require('../controllers/todo');

const router = express.Router();
router.use(authenticateJwt);

router.post("/", todoPost);

router.get("/", todoGet);

router.put("/:id", todoPut);


module.exports = router;
