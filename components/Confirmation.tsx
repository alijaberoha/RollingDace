"use client";
import Link from "next/link";
import "@/styles/checkout.css"; // ou un fichier séparé si tu préfères

export default function ConfirmationPage() {
  return (
    <div className="confirmation-container">
      <h1>✅ Paiement confirmé !</h1>
      <p>Merci pour votre commande. Vous recevrez un e-mail de confirmation sous peu.</p>
      <Link href="/"><button className="btn-retour">Retour à l’accueil</button></Link>
    </div>
  );
}
