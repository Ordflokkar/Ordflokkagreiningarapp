import React from 'react';

function Homepage({ startAnalysis }) {
  return (
    <div className="homepage">
      <h1>Orðflokkagreiningarappið</h1>
      <p>Þetta app hjálpar þér að greina íslensk orð í orðflokka og fræðast um eiginleika orðflokkanna.</p>
      <p>Þú færð spurningar sem þú svarar játandi eða neitandi og á endanum færðu að vita í hvaða flokki orðið er.</p>
      <p>Athugaðu að þetta app er hugsað sem hjálpartæki. Ef þú ert óviss um niðurstöðuna skaltu fletta henni upp, t.d. á m.is eða á öðrum öruggum stað.</p>
      <button onClick={startAnalysis} className="button">Hefja greiningu</button>
    </div>
  );
}

export default Homepage;