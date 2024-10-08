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

  const createResultText = (word, result) => {
    return `Flott! Orðið ${word} er ${result}.`;
  };

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
        setResult(createResultText(word, resultMessage));
        nextQuestion = -2; 
      } else if (typeof next === "number") {
        nextQuestion = next;
      } else {
        setResult(createResultText(word, next));
        nextQuestion = -2; 
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
    if (!tooltips) return text;  
  
    const words = text.split(/\s+/);  
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:()'"]/g, '').toLowerCase();  
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
    } else if (currentQuestion === -2) {
      return (
        <div className="result">
          <p>{result}</p>
          <div className="button-container">
            <button onClick={resetAnalysis} className="button">Greina annað orð</button>
            {answerHistory.length > 0 && (
              <button onClick={handleGoBack} className="back-button">Til baka</button>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="question">
          <p>{renderQuestionText(getCurrentQuestionOrAnswer(), questions[currentQuestion]?.tooltips)}</p>
          {questions[currentQuestion] && (
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