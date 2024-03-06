import { useState, useEffect } from "react";

export default function QuestionTimer({ timeOut, onTimeOut, mode }) {
  // Set interval
  const [remainingTime, setRemainingTime] = useState(timeOut);
  const intervalTime = timeOut * 0.05;
  useEffect(() => {
    const _timeOut = setTimeout(onTimeOut, timeOut);
    return () => {
      clearTimeout(_timeOut);
    };
  }, [onTimeOut, timeOut]);

  useEffect(() => {
    const _interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - intervalTime);
    }, intervalTime);
    return () => {
      clearInterval(_interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeOut}
      value={remainingTime}
      className={mode}
    />
  );
}
