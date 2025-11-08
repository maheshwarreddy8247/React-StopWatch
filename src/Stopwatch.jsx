import React, { useState, useEffect, useRef } from 'react';
import './index.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function toggleStartStop() {
    setIsRunning((prev) => !prev);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch-container">
      <h1 className="title">⏱ React Stopwatch</h1>
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="controls">
          <button
            onClick={toggleStartStop}
            className={`btn ${isRunning ? 'stop' : 'start'}`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button onClick={reset} className="btn reset">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
