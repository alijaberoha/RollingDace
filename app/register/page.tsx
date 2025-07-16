"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import "../../styles/register.css";
import { ajouterAuPanier } from "@/features/panierSlice";
import carte from "../../public/cartes.avif"
export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [abonnement, setAbonnement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setErreur("");
    setSuccess("");
  }, [email, password, abonnement]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");

    const dejaExistant = utilisateurs.find((u: any) => u.email === email);
    if (dejaExistant) {
      setErreur("Cet email est déjà utilisé.");
      return;
    }

    const newUser = { email, password, abonnement };

    if (abonnement) {
      // ✅ Sauvegarde temporaire dans localStorage
      localStorage.setItem("newUserPending", JSON.stringify(newUser));

      // ✅ Ajouter la carte abonnement dans le panier
      dispatch(ajouterAuPanier({
        id: "abonnement",
        name: "Abonnement 50%",
        thumbnail: carte.src,
        price: 100,
        currency: "€",
      }));

      // ✅ Redirection vers la page de paiement
      router.push("/checkout");
      return;
    }

    // ✅ Cas sans abonnement → inscription immédiate
    const nouveau = [...utilisateurs, newUser];
    localStorage.setItem("utilisateurs", JSON.stringify(nouveau));
    setSuccess("Inscription réussie !");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="register-container">
      <Link href="/" className="retour-accueil">← Retour à l’accueil</Link>

      <h2>Créer un compte</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="abonnement-check">
          <input
            type="checkbox"
            checked={abonnement}
            onChange={(e) => setAbonnement(e.target.checked)}
          />
          Voulez-vous l'abonnement à 100€ (-50% sur tous les prix) ?
        </label>

        <button type="submit">S'inscrire</button>

        {erreur && <p className="erreur">{erreur}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <p className="switch-auth">
        Déjà inscrit ? <Link href="/login">Se connecter</Link>
      </p>
    </div>
  );
}
