"use client";
import { useEffect, useState } from "react";
import "../styles/checkout.css";

type Props = {
  onNext: () => void;
  loading: boolean;
  onValidationChange: (valide: boolean) => void;
};

export default function PaiementSimule({ onNext, loading, onValidationChange }: Props) {
  const [cardInfo, setCardInfo] = useState({
    nom: "",
    numero: "",
    date: "",
    code: "",
  });

  // Vérifie la validité à chaque changement
  useEffect(() => {
    const tousRemplis = Object.values(cardInfo).every((val) => val.trim() !== "");
    const formatCarteOk = /^[0-9]{10}$/.test(cardInfo.numero); // exactement 10 chiffres
    onValidationChange(tousRemplis && formatCarteOk);
  }, [cardInfo, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "numero") {
      // N’autorise que les chiffres et max 10 caractères
      const numeriqueSeulement = value.replace(/\D/g, "");
      if (numeriqueSeulement.length <= 10) {
        setCardInfo({ ...cardInfo, numero: numeriqueSeulement });
      }
    } else {
      setCardInfo({ ...cardInfo, [name]: value });
    }
  };

  const handlePayer = (e: React.FormEvent) => {
    e.preventDefault();
    const tousRemplis = Object.values(cardInfo).every((val) => val.trim() !== "");
    const formatCarteOk = /^[0-9]{10}$/.test(cardInfo.numero);
    if (!tousRemplis || !formatCarteOk) return;

    onNext(); // Passe à l’étape suivante (confirmation)
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
        placeholder="Numéro de carte (10 chiffres)"
        value={cardInfo.numero}
        onChange={handleChange}
        inputMode="numeric"
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
