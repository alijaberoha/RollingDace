"use client";
import { useEffect, useState } from "react";
import FormulaireAdresse from "@/components/FormulaireAdresse";
import Panier from "@/components/Panier";
import PaiementSimule from "@/components/PaiementSimule";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { viderPanier } from "@/features/panierSlice";
import { useRouter } from "next/navigation";
import "../../styles/checkout.css"
export default function CheckoutPage() {
  const [etape, setEtape] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dateLivraison, setDateLivraison] = useState("");
  const [formulaireValide, setFormulaireValide] = useState(false);
  const [paiementValide, setPaiementValide] = useState(false);

  const panier = useSelector((state: RootState) => state.panier.items);
  const dispatch = useDispatch();
  const router = useRouter();

  // Calculer la date de livraison
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    };
    setDateLivraison(date.toLocaleDateString("fr-FR", options));
  }, []);

  // Vérifier si panier vide → rediriger
  useEffect(() => {
    if (panier.length === 0 && etape !== 3) {
      alert("Votre panier est vide.");
      router.push("/produits");
    }
  }, [panier, etape, router]);

  const next = () => {
    if (etape === 1 && !formulaireValide) return;
    if (etape === 2 && !paiementValide) return;
    setEtape((prev) => prev + 1);
  };

  const prev = () => setEtape((prev) => prev - 1);

  const nextWithLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      next();
    }, 2000);
  };

  return (
    <div className="checkout-wrapper">
      <div className="steps">
        <button disabled={etape === 1 || loading} onClick={prev}>⬅</button>
        <span>Étape {etape}/3</span>
        {etape < 3 && (
          <button
            disabled={loading || (etape === 1 && !formulaireValide) || (etape === 2 && !paiementValide)}
            onClick={etape === 2 ? nextWithLoading : next}
          >
            ➡
          </button>
        )}
      </div>

      <button onClick={() => router.push("/produits")} className="btn-secondaire">
        ⬅ Continuer ses achats
      </button>

      {etape === 1 && (
        <FormulaireAdresse
          onNext={next}
          onValidationChange={(valide: boolean) => setFormulaireValide(valide)}
        />
      )}

      {etape === 2 && (
        <PaiementSimule
          onNext={nextWithLoading}
          loading={loading}
          onValidationChange={(valide: boolean) => setPaiementValide(valide)}
        />
      )}

      {etape === 3 && (
        <div className="confirmation-container">
          <h2>✅ Paiement validé !</h2>
          <p>Merci pour votre commande. Vous recevrez un e-mail de confirmation sous peu.</p>
          <p>📦 Votre commande arrivera dans 48h, le <strong>{dateLivraison}</strong>.</p>

          {panier.length === 0 ? (
            <p>Aucun article n'était présent dans le panier.</p>
          ) : (
            <>
              <ul>
                {panier.map((item) => (
                  <li key={item.id}>
                    <img src={item.thumbnail} alt={item.name} className="tendance-image" />
                    <br />
                    {item.name} – {item.quantity} × {item.price}€ ={" "}
                    {(item.quantity * item.price).toFixed(2)}€
                  </li>
                ))}
              </ul>
              <p>
                <strong>
                  Total :{" "}
                  {panier
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2)}€
                </strong>
              </p>
            </>
          )}

          <button
            className="btn-retour"
            onClick={() => {
              dispatch(viderPanier());

              const pendingUser = JSON.parse(localStorage.getItem("newUserPending") || "null");

              if (pendingUser) {
                const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
                const nouveau = [...utilisateurs, { ...pendingUser, abonnement: true }];
                localStorage.setItem("utilisateurs", JSON.stringify(nouveau));
                localStorage.removeItem("newUserPending");

                router.push("/login");
              } else {
                router.push("/");
              }
            }}
          >
            Terminer
          </button>
        </div>
      )}

      <Panier isOpen={true} onClose={() => {}} hideCommanderButton />
    </div>
  );
}
