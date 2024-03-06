import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz({}) {
  // Timeout value.
  const _TIMEOUT = 1000;
  // Stock answers.
  const [userAnswers, setUserAnswers] = useState([]);
  // Number of user answers === index of answers array (QUESTIONS[activeQuestionIndex].answers).
  const activeQuestionIndex = userAnswers.length;
  // Get Complete Quiz.
  const quizIsComplete = userAnswers.length === QUESTIONS.length;
  let shuffleAnswers;
  if (!quizIsComplete) {
    // Create a copy of initial answers arrays.
    shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    // Shuffle it.
    shuffleAnswers.sort(() => Math.random() - 0.5);
  }

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
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz is complete" />
        <h2>Quiz completed !</h2>
      </div>
    );
  }
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeOut={_TIMEOUT} onTimeOut={handleSkipSelectAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
