"use client";
import { useState } from "react";
import "../styles/checkout.css";

type Props = {
  onNext: () => void;
  loading: boolean;
};

export default function PaiementSimule({ onNext, loading }: Props) {
  const [cardInfo, setCardInfo] = useState({
    nom: "",
    numero: "",
    date: "",
    code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handlePayer = (e: React.FormEvent) => {
    e.preventDefault();

    // Facultatif : vérifie que tous les champs sont remplis
    const tousRemplis = Object.values(cardInfo).every((val) => val.trim() !== "");
    if (!tousRemplis) return;

    onNext(); // délégué au parent (CheckoutPage) avec loading géré là-bas
  };

  return (
    <form onSubmit={handlePayer} className="form-paiement">
      <h2>Paiement sécurisé</h2>

      <input
        type="text"
        name="nom"
        placeholder="Nom sur la carte"
        value={cardInfo.nom}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="numero"
        placeholder="Numéro de carte"
        value={cardInfo.numero}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="date"
        placeholder="Date d’expiration (MM/AA)"
        value={cardInfo.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="code"
        placeholder="Code de sécurité"
        value={cardInfo.code}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Traitement en cours..." : "Payer"}
      </button>

      <img src="/pay1.png" alt="Carte 1" />
      <img src="/pay2.png" alt="Carte 2" />
    </form>
  );
}
