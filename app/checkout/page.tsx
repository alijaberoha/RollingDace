"use client";
import { useState } from "react";
import FormulaireAdresse from "@/components/FormulaireAdresse";
import Panier from "@/components/Panier";
import PaiementSimule from "@/components/PaiementSimule";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { viderPanier } from "@/features/panierSlice";


export default function CheckoutPage() {
  const [etape, setEtape] = useState(1);
  const [loading, setLoading] = useState(false);

  const panier = useSelector((state: RootState) => state.panier.items); // ✅ nom correct selon ton panierSlice

  const next = () => {
    // ✅ bloquer passage à l'étape 2 si panier vide
    if (etape === 1 && panier.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    setEtape((prev) => prev + 1);
  };

  const prev = () => setEtape((prev) => prev - 1);
const dispatch = useDispatch();

const handleRetourAccueil = () => {
  dispatch(viderPanier());
};


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
          <button disabled={loading} onClick={etape === 2 ? nextWithLoading : next}>➡</button>
        )}
      </div>

      {etape === 1 && <FormulaireAdresse onNext={next} />}
      {etape === 2 && <PaiementSimule onNext={nextWithLoading} loading={loading} />}
      {etape === 3 && (
        <div className="confirmation-container">
          <h2> Paiement validé !</h2>
          <p>Merci pour votre commande. Voici un récapitulatif :</p>

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
                    .toFixed(2)}€</strong>
              </p>
              
            </>
          )}
<Link href="/" onClick={handleRetourAccueil}>
  <button className="btn-retour">Retour à l’accueil</button>
</Link>

        </div>
      )}

      <Panier isOpen={true} onClose={() => {}} hideCommanderButton />
    </div>
  );
}
