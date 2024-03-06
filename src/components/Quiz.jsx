import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import completeImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz({) {
  const [userAnswers, setUserAnswers] = useState([]);
  // Manage bg color state classes.
  const [answerState, setAnswerState] = useState("");
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  // Check the Quiz is over when userAnswers.lenght === questions.lenght.
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer]);
      // Let's go for cumbersome code.
      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    console.log("handleSkipAnswer");
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);
  if (quizIsComplete) {
    console.log("quizIsComplete", userAnswers);
    return (
      <div id="summary">
        <img src={completeImg} alt="Quiz completed" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSelect={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
