import React, { useState } from 'react';
import './App.css';
import Homepage from './Homepage';
import { questions } from './questions';

function App() {
  const [answerHistory, setAnswerHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleAnswer = (answer) => {
    const currentQ = questions[currentQuestion];
    let nextQuestion;
    let currentAnswer;
  
    if (currentQ.type === "input") {
      if (word.trim() === '') {
        alert('Vinsamlegast sláðu inn orð til að greina.');
        return;
      }
      nextQuestion = currentQ.next;
      currentAnswer = word;
    } else if (currentQ.type === "yesno") {
      const next = answer ? currentQ.onYes : currentQ.onNo;
      if (typeof next === "function") {
        const resultMessage = next();
        setResult(`Flott! Orðið <strong>${word}</strong> er ${resultMessage}.`);
        nextQuestion = -2; // -2 táknar niðurstöðusíðu
      } else if (typeof next === "number") {
        nextQuestion = next;
      } else {
        setResult(`Flott! Orðið <strong>${word}</strong> er ${next}.`);
        nextQuestion = -2; // -2 táknar niðurstöðusíðu
      }
      currentAnswer = answer ? "Já" : "Nei";
    }
  
    setAnswerHistory([...answerHistory, { 
      question: currentQuestion, 
      answer: currentAnswer, 
      word: word 
    }]);
    setCurrentQuestion(nextQuestion);
  };
  const handleGoBack = () => {
    if (answerHistory.length > 0) {
      const newHistory = answerHistory.slice(0, -1);
      setAnswerHistory(newHistory);
      const lastEntry = newHistory[newHistory.length - 1];
      if (lastEntry) {
        setCurrentQuestion(lastEntry.question);
        setWord(lastEntry.word);
      } else {
        setCurrentQuestion(-1);
        setWord('');
      }
      setResult('');
    }
  };
  const getCurrentQuestionOrAnswer = () => {
    if (currentQuestion === -2) {
      return result;
    } else if (currentQuestion >= 0 && currentQuestion < questions.length) {
      return questions[currentQuestion].question;
    } else {
      return '';
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
    if (!tooltips) return text;  // Skilar texta óbreyttum ef engin tooltips eru til staðar
  
    const words = text.split(/\s+/);  // Skiptir textanum í orð, tekur tillit til allra bilstafa
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:()'"]/g, '').toLowerCase();  // Hreinsar orðið af greinarmerkjum og gerir það lágstafa
      if (tooltips[cleanWord]) {
        return (
          <React.Fragment key={index}>
            <span
              className="tooltip-word"
              onClick={() => toggleTooltip(cleanWord)}
            >
              {word}
              {activeTooltip === cleanWord && (
                <span className="tooltip">{tooltips[cleanWord]}</span>
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
    } else {
      return (
        <div className="question">
          <p dangerouslySetInnerHTML={{ __html: getCurrentQuestionOrAnswer() }} />
          {currentQuestion !== -2 && questions[currentQuestion] && (
            <>
              {questions[currentQuestion].type === "input" ? (
                <div className="input-container">
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="input"
                    placeholder="Sláðu inn orð"
                  />
                  <div className="button-container">
                    <button onClick={() => handleAnswer(true)} className="button">Áfram</button>
                    {answerHistory.length > 0 && (
                      <button onClick={handleGoBack} className="back-button">Til baka</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="button-container">
                  <button onClick={() => handleAnswer(true)} className="button">Já</button>
                  <button onClick={() => handleAnswer(false)} className="button">Nei</button>
                  {answerHistory.length > 0 && (
                    <button onClick={handleGoBack} className="back-button">Til baka</button>
                  )}
                </div>
              )}
            </>
          )}
          {currentQuestion === -2 && (
            <div className="button-container">
              <button onClick={resetAnalysis} className="button">Greina annað orð</button>
              {answerHistory.length > 0 && (
                <button onClick={handleGoBack} className="back-button">Til baka</button>
              )}
            </div>
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