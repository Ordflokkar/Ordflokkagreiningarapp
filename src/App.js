import React, { useState } from 'react';
import './App.css';
import Homepage from './Homepage';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // -1 táknar forsíðu
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');

  const questions = [
    {
      question: "Sláðu inn orð til að greina. Ef hægt er að fallbeygja orðið þarf það að vera í eintölu og nefnifalli ef kostur er.",
      type: "input",
      next: 1
    },
    {
      question: "Er hægt að fallbeygja orðið?",
      type: "yesno",
      onYes: 2,
      onNo: 13
    },
    {
      question: "Flott! Orðið er fallorð. Viltu greina það í undirflokka?",
      type: "yesno",
      onYes: 3,
      onNo: () => "fallorð"
    },
    {
      question: "Tekur orðið við greini?",
      type: "yesno",
      onYes: () => "nafnorð",
      onNo: 4
    },
    {
      question: "Stigbreytist orðið?",
      type: "yesno",
      onYes: () => "lýsingarorð",
      onNo: 5
    },
    {
      question: "Er orðið töluorð?",
      type: "yesno",
      onYes: () => "töluorð",
      onNo: 6
    },
    {
      question: "Er orðið greinirinn hinn/hin/hið sem stendur við hlið nafnorðs? (Dæmi: Hin góða kona).",
      type: "yesno",
      onYes: () => "greinir",
      onNo: 7
    },
    {
      question: "Flott! Orðið er fornafn. Viltu greina það í undirflokka?",
      type: "yesno",
      onYes: 8,
      onNo: () => "fornafn"
    },
    {
      question: "Er orðið Ég, þú, hann, hún, hán eða það?",
      type: "yesno",
      onYes: () => "persónufornafn",
      onNo: 9
    },
    {
      question: "Vísar orðið til eignar á einhverjum hlut?",
      type: "yesno",
      onYes: () => "eignarfornafn",
      onNo: 10
    },
    {
      question: "Er orðið afturbeygða fornafnið sig (sér/sín)?",
      type: "yesno",
      onYes: () => "afturbeygt fornafn",
      onNo: 11
    },
    {
      question: "Er orðið sá, þessi eða hinn?",
      type: "yesno",
      onYes: () => "ábendingarfornafn",
      onNo: 12
    },
    {
      question: "Er orðið hver, hvor, hvaða eða hvílíkur?",
      type: "yesno",
      onYes: () => "spurnarfornafn",
      onNo: () => "óákveðið fornafn"
    },
    {
      question: "Er hægt að setja orðið í þátíð?",
      type: "yesno",
      onYes: () => "sagnorð",
      onNo: 14
    },
    {
      question: "Flott! Orðið er smáorð. Viltu greina það í undirflokka?",
      type: "yesno",
      onYes: 15,
      onNo: () => "smáorð"
    },
    {
      question: "Stýrir orðið falli? Það er að segja, er fallorð í þolfalli, þágufalli eða eignarfalli á eftir orðinu?",
      type: "yesno",
      onYes: () => "forsetning",
      onNo: 16
    },
    {
      question: "Tengir orðið saman tvö orð eða tvær setningar?",
      type: "yesno",
      onYes: () => "samtenging",
      onNo: 17
    },
    {
      question: "Er orðið upphrópun, eins og æ! eða ó!?",
      type: "yesno",
      onYes: () => "upphrópun",
      onNo: 18
    },
    {
      question: "Er orðið AÐ á undan sagnorði?",
      type: "yesno",
      onYes: () => "nafnháttarmerki",
      onNo: () => "atviksorð"
    }
  ];

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
    setCurrentQuestion(0); // Fer aftur á innsláttarsíðuna
    setWord('');
    setResult('');
  };

  const startAnalysis = () => {
    setCurrentQuestion(0);
    setResult('');
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
              <p>{questions[currentQuestion].question}</p>
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