import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizComplete from "../assets/quiz-complete.png";

export default function Quiz({}) {
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
  function handleSelectAnswer(answer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer]);
  }
  {
    if (quizIsComplete) {
      return (
        <div id="summary">
          <img src={quizComplete} alt="Quiz is complete" />
          <h2>Quiz completed !</h2>
        </div>
      );
    }
  }
  return (
    <div id="quiz">
      <div id="question">
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
