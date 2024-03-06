import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
}) {
  // useRef() is used to managing values which are not app cycle dependants.
  const shuffleAnswers = useRef();

  if (!shuffleAnswers.current) {
    // Create a copy of initial answers arrays.
    shuffleAnswers.current = [...answers];
    // Shuffle it.
    shuffleAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffleAnswers.current.map((answer) => {
        // Awful correct/wrong stuff.
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button className={cssClass} onClick={() => onSelectAnswer(answer)}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
