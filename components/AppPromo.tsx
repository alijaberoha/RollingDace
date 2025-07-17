"use client";
import "./AppPromo.css";

export default function AppPromo() {
  return (
    <section className="app-promo">
      <div className="phones">
        <img src="/contacte2.PNG" alt="App screen 1" />
        <img src="/qr-code3.PNG" alt="App screen 2" />
      </div>

      <div className="promo-text">
        <h2>Elle est partout !</h2>
        <p>
          L'application officielle Rolling Dice. <br />
          Scannez et téléchargez-la gratuitement dès maintenant.
        </p>

        <div className="store-buttons">
          <img src="/appel.PNG" alt="App Store" />
          <img src="/play.PNG" alt="Google Play" />
        </div>
      </div>
    </section>
  );
}

