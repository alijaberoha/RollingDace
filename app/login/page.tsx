"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../styles/login.css";
import { useDispatch } from "react-redux";
import { login } from "@/features/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  const comptesFixes = [
    { email: "alijaberoha@hotmail.com", password: "AZERTY1080" },
    { email: "gary@mgk.com", password: "MLG123" },
  ];

  const getTousLesUtilisateurs = () => {
    const comptesStockés = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    return [...comptesFixes, ...comptesStockés];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const utilisateurs = getTousLesUtilisateurs();

    const user = utilisateurs.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      dispatch(login(user));
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } else {
      setErreur("Identifiants invalides.");
    }
  };

  return (
    <div className="login-container">
      <Link href="/" className="retour-accueil">← Retour à l’accueil</Link>

      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Se connecter</button>
        {erreur && <p className="erreur">{erreur}</p>}
      </form>

      <p className="switch-auth">
        Pas encore de compte ? <Link href="/register">Créer un compte</Link>
      </p>
    </div>
  );
}
