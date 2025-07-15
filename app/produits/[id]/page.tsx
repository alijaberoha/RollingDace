"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import jeux from "../../../public/jeux_50.json";
import "../../../styles/produits.css";
import Nav from "@/components/Nav";
import { useAppDispatch } from "@/lib/store";
import { ajouterAuPanier } from "@/features/panierSlice";
import Tendance from "@/components/Tendance";

export default function JeuDetailPage() {
  const { id } = useParams();
  const [jeu, setJeu] = useState<any>(null);
  const [quantite, setQuantite] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const found = jeux.find((j) => j.id === id);
    setJeu(found);
  }, [id]);

  if (!jeu) return <p>Chargement...</p>;

  const handleAjoutPanier = () => {
    dispatch(
      ajouterAuPanier({
        id: jeu.id,
        name: jeu.name,
        thumbnail: jeu.thumbnail,
        price: jeu.price,
        currency: jeu.currency,
    
      })
    );
  };

  return (
    <>
      <Nav />
      <Link href="/produits">
        <p className="retour-btn">⬅ Retour aux produits</p>
      </Link>

      <div className="detail-container">
        <div className="produits-cotent">
          <img src={jeu.thumbnail} alt={jeu.name} className="detail-image" />
          <div className="detail-info">
            <h1>{jeu.name}</h1>
            <p><strong>Année :</strong> {jeu.yearpublished || "?"}</p>
            <p><strong>Description :</strong> {jeu.description || "Un jeu captivant de stratégie et d'aventure."}</p>
            <p><strong>Note :</strong> {jeu.rating} ⭐</p>
            <p><strong>Joueurs :</strong> {jeu.players.min || "?"} à {jeu.players.max || "?"}</p>
            <p><strong>Durée :</strong> 45 min</p>
            <p><strong>Âge :</strong> {jeu.age || "?"}+</p>
            <p className="prix">Prix : {jeu.price} {jeu.currency || "€"}</p>

            <div className="buttons">
 <button
  className="panier-btn"
  onClick={() =>
    dispatch(
      ajouterAuPanier({
        id: jeu.id,
        name: jeu.name,
        price: jeu.price,
        currency: jeu.currency,
        thumbnail: jeu.thumbnail,
      })
    )
  }
>
  Ajouter au panier
</button>
            </div>
          </div>
        </div>
      </div>
    <Tendance/>
    </>
  );
}
