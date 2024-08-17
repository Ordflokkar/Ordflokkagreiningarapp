import React, { useState } from 'react';
import './App.css';
import Homepage from './Homepage';
import { questions } from './questions';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleAnswer = (answer) => {
    const currentQ = questions[currentQuestion];
    if (currentQ.type === "input") {
      if (word.trim() === '') {
        alert('Vinsamlegast sláðu inn orð til að greina.');
        return;
      }
      setCurrentQuestion(currentQ.next);
    } else if (currentQ.type === "yesno") {
      const next = answer ? currentQ.onYes : currentQ.onNo;
      if (typeof next === "function") {
        const resultMessage = next();
        setResult(`Flott! Orðið <strong>${word}</strong> er ${resultMessage}.`);
        setCurrentQuestion(-2); // -2 táknar niðurstöðusíðu
      } else if (typeof next === "number") {
        setCurrentQuestion(next);
      } else {
        setResult(`Flott! Orðið <strong>${word}</strong> er ${next}.`);
        setCurrentQuestion(-2); // -2 táknar niðurstöðusíðu
      }
    }
  };

  const resetAnalysis = () => {
    setCurrentQuestion(0);
    setWord('');
    setResult('');
    setActiveTooltip(null);
  };

  const startAnalysis = () => {
    setCurrentQuestion(0);
    setResult('');
    setActiveTooltip(null);
  };

  const toggleTooltip = (word) => {
    setActiveTooltip(activeTooltip === word ? null : word);
  };

  const renderQuestionText = (text, tooltips) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      if (tooltips && tooltips[word]) {
        return (
          <React.Fragment key={index}>
            <span 
              className="tooltip-word" 
              onClick={() => toggleTooltip(word)}
            >
              {word}
              {activeTooltip === word && (
                <span className="tooltip">{tooltips[word]}</span>
              )}
            </span>
            {' '}
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };

  const renderContent = () => {
    if (currentQuestion === -1) {
      return <Homepage startAnalysis={startAnalysis} />;
    } else if (currentQuestion === -2) {
      return (
        <div className="result">
          <h2>Niðurstaða greiningar</h2>
          <p dangerouslySetInnerHTML={{ __html: result }} />
          <button onClick={resetAnalysis} className="button">Greina annað orð</button>
        </div>
      );
    } else {
      return (
        <div className="question">
          {questions[currentQuestion] && (
            <>
              <p>{renderQuestionText(questions[currentQuestion].question, questions[currentQuestion].tooltips)}</p>
              {questions[currentQuestion].type === "input" ? (
                <div className="input-container">
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="input"
                    placeholder="Sláðu inn orð"
                  />
                  <button onClick={() => handleAnswer(true)} className="button">Áfram</button>
                </div>
              ) : (
                <div className="button-container">
                  <button onClick={() => handleAnswer(true)} className="button">Já</button>
                  <button onClick={() => handleAnswer(false)} className="button">Nei</button>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;