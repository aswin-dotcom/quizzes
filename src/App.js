import { useEffect, useState } from 'react';
import './App.css'; // Import your CSS file for styling
import questions from './Questions.json';

function App() {
  const [questionnos, setQuestionNos] = useState(0);
  const [hideResult, setHideResult] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);

  useEffect(() => {
    let interval;
    if (time > 0 && !hideResult) {
      interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setHideResult(true);
    }
    return () => clearInterval(interval);
  }, [time, hideResult]);

  function check(option) {
    if (option === questions[questionnos].correctoption) {
      setQuestionNos((next) => next + 1);
      setScore((crt) => crt + 1);
    }

    if (option !== questions[questionnos].correctoption) {
      setQuestionNos((next) => next + 1);
    }
    if (questionnos === questions.length - 1) {
      setHideResult(true);
    }
  }

  function restart() {
    setQuestionNos(0);
    setHideResult(false);
    setScore(0);
  }

  return (
    <div className="App">
      {hideResult ? (
        <div className="score-section">
          <h2>Your Score : {score}/{questions.length}</h2>
          <button onClick={restart}>Restart</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question: {questions[questionnos].id + 1}</h2>
          <p>{questions[questionnos].questions}</p>
          <div className="options">
            {questions[questionnos].options.map((option, index) => (
              <button onClick={() => check(option)} key={index}>{option}</button>
            ))}
          </div>
          <div className="Timer">Time Left : <span>{time}s</span></div>
        </div>
      )}
    </div>
  );
}

export default App;
