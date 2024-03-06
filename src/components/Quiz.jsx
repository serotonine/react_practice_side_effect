import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComplete from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz({}) {
  // Timeout value.
  const _TIMEOUT = 10000;
  // Stock answers.
  const [userAnswers, setUserAnswers] = useState([]);
  // Awful correct/wrong answer.
  function isCorrectAnswer(selectedAnswer, index) {
    const isCorrect = selectedAnswer === QUESTIONS[index].answers[0];
    isCorrect ? setAnswerState("correct") : setAnswerState("wrong");
  }

  // Number of user answers === index of answers array (QUESTIONS[activeQuestionIndex].answers).
  const activeQuestionIndex = userAnswers.length;
  // Get Complete Quiz.
  const quizIsComplete = userAnswers.length === QUESTIONS.length;

  /*
   *  Call useCallback to cache a function definition between re-renders
   * This way the function is not re-referenced.
   */
  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer]);
  }, []);

  const handleSkipSelectAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    console.log("User answers", userAnswers);
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz is complete" />
        <h2>Quiz completed !</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        timeOut={_TIMEOUT}
        onSkipAnswer={handleSkipSelectAnswer}
      />
    </div>
  );
}
