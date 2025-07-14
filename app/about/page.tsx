"use client";

import "../globals.css";
import Nav from "@/components/Nav";
import App from "../../components/AppPromo"
export default function AboutPage() {
  return (
    <>
      <div className="about-container">

        <div className="about-page">
                    <Nav />
     </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Notre mission</h2>
            <p>
              Nous croyons au pouvoir du jeu pour rapprocher les gens. C’est pourquoi nous
              vous proposons une sélection de jeux variés, pour tous les âges, tous les goûts
              et toutes les occasions. Que ce soit pour une soirée en famille ou un challenge entre amis,
              Rolling Dice est là pour vous accompagner.
            </p>
          </div>

          <div className="about-image">
            <img src="/contacte.png" alt="Nous contacter" />
          </div>
        </div>
        <App/>
      </div>
    </>
  );
}
