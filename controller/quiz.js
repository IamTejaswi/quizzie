const Quiz = require("../models/Quiz");

const setQuizDetails = async (req, res) => {
  try {
    const { quiz, quizName, quizType, timer, userId } = req.body;

    const newQuiz = new Quiz({
      quizName,
      questions: quiz,
      quizType,
      timer,
      impressions: 0,
      userId,
    });
    await newQuiz.save();
    res.status(200).json({
      success: true,
      message: "Quiz added successfully",
      newQuiz,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { setQuizDetails};