import React from "react";
import "../app/globals.css"; // adapte selon ton projet
import Link from "next/link"; // 👈 importe Link

type Props = {
  jeu: {
    id: string;
    name: string;
    thumbnail: string;
    year: string;
    price: number;
    players_min: number;
    players_max: number;
    time: number;
    rating: number;
    minAge: number;
    description: string;
    currency: string;
  };
};

export default function CardProduit({ jeu }: Props) {
  return (
    <div className="card-produit">
      <img src={jeu.thumbnail} alt={jeu.name} className="produit-image" />

      <div className="produit-info">
        <h2 className="produit-nom">{jeu.name}</h2>
        <p>Note : {jeu.rating} ⭐</p>
        <p className="produit-prix">
          Prix : {jeu.price} {jeu.currency}
        <Link href={`/produits/${jeu.id}`}>
            <button>
                voir
            </button>
        </Link>
        </p>
      </div>
    </div>
  );
}
