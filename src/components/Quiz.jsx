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
  const [answerState, setAnswerState] = useState("");
  function isCorrectAnswer(selectedAnswer, index) {
    console.log("isCorrectAnswer", selectedAnswer);
    const isCorrect = selectedAnswer === QUESTIONS[index].answers[0];
    isCorrect ? setAnswerState("correct") : setAnswerState("wrong");
  }
  // Number of user answers === index of answers array (QUESTIONS[activeQuestionIndex].answers).
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  // Get Complete Quiz.
  const quizIsComplete = userAnswers.length === QUESTIONS.length;

  /*
   *  Call useCallback to cache a function definition between re-renders
   * This way the function is not re-referenced.
   */
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer]);
      // Awful correct/wrong.
      setTimeout(() => {
        isCorrectAnswer(answer, activeQuestionIndex);
        // Re-init
        setTimeout(() => setAnswerState(""), 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipSelectAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
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
        title={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        timeOut={_TIMEOUT}
        onSkipAnswer={handleSkipSelectAnswer}
      />
    </div>
  );
}
