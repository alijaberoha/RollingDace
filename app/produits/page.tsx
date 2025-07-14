"use client";

import "../globals.css";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import { fetchProduits } from "@/features/produitSlice";
import CardProduit from "@/components/CardProduit";

export default function ProduitsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.produits);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  // ✅ Filtres et tri
  const jeuxFiltres = items
    .filter((jeu) =>
      jeu.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "age") return (a.age ?? 0) - (b.age ?? 0);
      if (sortOption === "note") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortOption === "players") return (b.players?.max ?? 0) - (a.players?.max ?? 0);
      return 0;
    });

  return (
    <>
      <div className="ctn">
        <Nav />
                  
        <div className="produits-page">


          <div className="produits-content">
            <h1>Commandez vos jeux dès maintenant</h1>
            <p>
              Explorez notre large sélection de jeux pour tous les âges et toutes les envies.
            </p>
          </div>
        </div>
      </div>
      <div className="filtres">
            <input
              type="text"
              placeholder="Rechercher un jeu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Trier par...</option>
              <option value="age">Âge minimum</option>
              <option value="note">Note</option>
              <option value="players">Nombre de joueurs</option>
            </select>
          </div>

      <div className="cartes-produits">
        {loading && <p>Chargement en cours...</p>}
        {error && <p>Erreur : {error}</p>}
        {!loading && !error && jeuxFiltres.length > 0 && (
          <div className="cards-container">
            {jeuxFiltres.map((jeu) => (
              <CardProduit key={jeu.id} jeu={jeu} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
