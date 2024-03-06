import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

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
    console.log("QUIZ COMPLETE", userAnswers);
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
        <QuestionTimer
          key={activeQuestionIndex}
          timeOut={_TIMEOUT}
          onTimeOut={handleSkipSelectAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => {
            // Awful correct/wrong stuff.
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";
            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }
            if (
              answerState === "correct" ||
              (answerState === "wrong" && isSelected)
            ) {
              cssClass = answerState;
            }
            return (
              <li key={answer} className="answer">
                <button
                  className={cssClass}
                  onClick={() => handleSelectAnswer(answer)}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
