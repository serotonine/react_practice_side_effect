import { useState, useRef } from "react";
import QUESTIONS from "../questions.js";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({
  index,
  onSelectAnswer,
  timeOut,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  function handleSelectAnswer(answer) {
    console.log(answer);
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });
      setTimeout(() => onSelectAnswer(answer), 1000);
    }, 500);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer timeOut={timeOut} onTimeOut={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
