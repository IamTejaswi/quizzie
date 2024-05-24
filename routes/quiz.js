const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz");


router.post("/setQuizDetails",quizController.setQuizDetails);
module.exports = router; 