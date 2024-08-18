import React from 'react';

function Homepage({ startAnalysis }) {
  return (
    <div className="homepage">
      <h1>Orðflokkagreiningarappið</h1>
      <p>Þetta app hjálpar þér að greina íslensk orð í orðflokka og fræðast um eiginleika orðflokkanna.</p>
      <p>Þú færð spurningar sem þú svarar játandi eða neitandi og á endanum færðu að vita í hvaða flokki orðið er. Athugaðu að þú getur gert villur og appið veit það ekki. Ef þú gerir villur, verður niðurstaðan ekki rétt. </p>
      <p>Athugaðu að þetta app er hugsað sem hjálpartæki. Ef þú ert óviss um niðurstöðuna skaltu fletta henni upp, t.d. á m.is eða á öðrum öruggum stað.</p>
      <p className="author-info">Höfundur og ábyrgðarmaður: Hildur Ýr Ísberg. Netfang: hyi1@hi.is</p>
      <button onClick={startAnalysis} className="button">Hefja greiningu</button>
    </div>
  );
}

export default Homepage;