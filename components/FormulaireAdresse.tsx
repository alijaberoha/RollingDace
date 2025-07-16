"use client";
import { useEffect, useState } from "react";
import "./FormulaireAdresse.css";

type Props = {
  onNext: () => void;
  onValidationChange: (valide: boolean) => void;
};

export default function FormulaireAdresse({ onNext, onValidationChange }: Props) {
  const [form, setForm] = useState({
    nom: "",
    rue: "",
    ville: "",
    codePostal: "",
    pays: "Belgique",
  });

  const [errors, setErrors] = useState({
    nom: "",
    rue: "",
    ville: "",
    codePostal: "",
  });

  // ✅ Vérifie en direct la validité et informe CheckoutPage
  useEffect(() => {
    const isValid = Object.values(form).every((val) => val.trim() !== "");
    onValidationChange(isValid);
  }, [form, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nom: form.nom.trim() === "" ? "Veuillez remplir ce champ." : "",
      rue: form.rue.trim() === "" ? "Veuillez remplir ce champ." : "",
      ville: form.ville.trim() === "" ? "Veuillez remplir ce champ." : "",
      codePostal: form.codePostal.trim() === "" ? "Veuillez remplir ce champ." : "",
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((msg) => msg === "");
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="form-adresse-wrapper">
      <form onSubmit={handleSubmit} className="form-adresse">
        <h2>Adresse de livraison</h2>

        <div>
          <input
            type="text"
            name="nom"
            placeholder="Nom complet"
            value={form.nom}
            onChange={handleChange}
          />
          {errors.nom && <p className="error">{errors.nom}</p>}
        </div>

        <div>
          <input
            type="text"
            name="rue"
            placeholder="Rue"
            value={form.rue}
            onChange={handleChange}
          />
          {errors.rue && <p className="error">{errors.rue}</p>}
        </div>

        <div>
          <input
            type="text"
            name="ville"
            placeholder="Ville"
            value={form.ville}
            onChange={handleChange}
          />
          {errors.ville && <p className="error">{errors.ville}</p>}
        </div>

        <div>
          <input
            type="text"
            name="codePostal"
            placeholder="Code postal"
            value={form.codePostal}
            onChange={handleChange}
          />
          {errors.codePostal && <p className="error">{errors.codePostal}</p>}
        </div>

        <input type="text" name="pays" placeholder="Pays" value={form.pays} disabled />

        <button type="submit">Valider l'adresse</button>
      </form>

      {/* Carte Google juste pour le style */}
      <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.6998201595807!2d10.532480824961898!3d42.963529846764814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d62183f8ec3a0f%3A0x81dcf4d813a30180!2s57025%20Fiorentina%2C%20Livourne%2C%20Italie!5e0!3m2!1sfr!2sbe!4v1752496916329!5m2!1sfr!2sbe"
          width="100%"
          height="300"
          style={{ border: 0, marginTop: "20px", borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
