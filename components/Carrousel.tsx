"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./Carrousel.css";

const images = [ "/carous1.jpg", "/carous6.jpg","/carous7.jpg"];

const textes = [

  {
    titre: " Découvrez l'univers des jeux",
    sousTitre: "Des classiques intemporels aux nouveautés excitantes.",
  },
        {
    titre: " Des offres spéciales en cours",
    sousTitre: "Profitez de réductions exceptionnelles sur nos best-sellers.",
  },
    {
    titre: " Grand et petit, amusez-vous en famille",
    sousTitre: "Des jeux pour petits et grands, à tout moment.",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="carousel">
        {images.map((src, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === current ? "active" : ""}`}
          >
            <Image
              src={src}
              alt={`carous${index + 1}`}
              fill
              objectFit="cover"
            />

            {index === current && (
              <div className="carousel-text">
                <h2>{textes[index].titre}</h2>
                <p>{textes[index].sousTitre}</p>
              </div>
            )}
          </div>
        ))}

        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

      <section className="membre-section">
        <div className="membre-content">
          <h2> Devenez membre</h2>
          <p>
            Profitez de <span className="highlight">-50%</span> sur tous nos jeux !
            Rejoignez notre communauté et recevez des surprises exclusives 
          </p>
          <button className="membre-btn">Connexion</button>
        </div>
      </section>
    </>
  );
}
