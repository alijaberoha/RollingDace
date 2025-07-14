// components/Tendance.tsx
"use client";
import jeux from "../public/jeux_50.json";
import Image from "next/image";
import Link from "next/link";
import "./Tendance.css"; // si tu veux un CSS séparé

export default function Tendance() {
  const jeuxTendance = jeux.slice(0, 3); // 👈 les 4 premiers

  return (
    <section className="tendance-section">
      <h2 className="tendance-title">Tendance</h2>
      <div className="tendance-cards">
        {jeuxTendance.map((jeu) => (
          <div key={jeu.id} className="tendance-card">
            <img src={jeu.thumbnail} alt={jeu.name} className="tendance-image" />
            <h3 className="tendance-name">{jeu.name}</h3>
            <p className="tendance-desc">
              {jeu.description?.slice(0, 60) || "Jeu populaire actuellement"}
            </p>
            <Link href={`/produits/${jeu.id}`}>
              <button className="voir-btn">Voir</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
