import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => QUESTIONS[index].answers[0] === answer
  );
  const wrongAnswers = userAnswers.filter(
    (answer, index) => QUESTIONS[index].answers[0] !== answer
  );
  const skipped = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const wrong = Math.round((wrongAnswers.length / userAnswers.length) * 100);
  const correct = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  return (
    <div id="summary">
      <img src={quizComplete} alt="Quiz is complete" />
      <h2>Quiz completed !</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{`${skipped}%`}</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{`${wrong}%`}</span>
          <span className="text">Wrong</span>
        </p>
        <p>
          <span className="number">{`${correct}%`}</span>
          <span className="text">Correct</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let isCorrect;
          if (answer === null) {
            isCorrect = "skipped";
          } else if (QUESTIONS[index].answers[0] === answer) {
            isCorrect = "correct";
          } else {
            isCorrect = "wrong";
          }
          return (
            <li key={Math.random()}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={`user-answer ${isCorrect}`}>
                {answer ? answer : "skipped"}
              </p>
              {isCorrect !== "correct" && (
                <p>
                  <span className="user-answer">The correct answer is: </span>
                  <span className="user-answer correct">
                    {QUESTIONS[index].answers[0]}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
