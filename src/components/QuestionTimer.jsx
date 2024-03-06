import { useState, useEffect } from "react";

export default function QuestionTimer({ timeOut, onTimeOut }) {
  // Set interval
  const [remainingTime, setRemainingTime] = useState(timeOut);
  const intervalTime = timeOut * 0.05;
  useEffect(() => {
    setTimeout(onTimeOut, timeOut);
  }, [onTimeOut, timeOut]);

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - intervalTime);
    }, intervalTime);
  }, []);

  return <progress id="question-time" max={timeOut} value={remainingTime} />;
}
