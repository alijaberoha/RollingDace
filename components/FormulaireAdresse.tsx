"use client";
import { useState } from "react";
import "./FormulaireAdresse.css"; // à créer juste après

export default function FormulaireAdresse() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    codePostal: "",
    pays: "Belgique",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
    // tu peux stocker ça dans Redux ou localStorage si besoin
  };

  return (
    <form className="form-adresse" onSubmit={handleSubmit}>
      <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
      <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} required />
      <input type="text" name="adresse" placeholder="Adresse" onChange={handleChange} required />
      <input type="text" name="ville" placeholder="Ville" onChange={handleChange} required />
      <input type="text" name="codePostal" placeholder="Code postal" onChange={handleChange} required />
      <input type="text" name="pays" value={formData.pays} readOnly />
      <button type="submit">Continuer</button>
    </form>
  );
}
