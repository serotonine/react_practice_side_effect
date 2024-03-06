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
  // Avoid the timer expire even if an answer was selected.
  let timer = timeOut;
  const timerSelectedAnswer = 1000;
  const timerIsCorrect = 2000;
  if (answer.selectedAnswer) {
    timer = timerSelectedAnswer;
  }
  if (answer.isCorrect !== null) {
    timer = timerIsCorrect;
  }
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
      setTimeout(() => onSelectAnswer(answer), timerIsCorrect);
    }, timerSelectedAnswer);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeOut={timer}
        onTimeOut={answer.onSelectAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
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
