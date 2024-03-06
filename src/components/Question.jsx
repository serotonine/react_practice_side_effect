import { useRef } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({
  title,
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
  timeOut,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      <QuestionTimer timeOut={timeOut} onTimeOut={onSkipAnswer} />
      <h2>{title}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
}
