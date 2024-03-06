import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    console.log("SET INTERVAL");
    const _interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => {
      clearInterval(_interval);
    };
  }, []);

  useEffect(() => {
    console.log("SET TIMEOUT");
    const _timeout = setTimeout(onTimeOut, timeout);
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout, onTimeOut]);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
