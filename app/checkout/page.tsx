"use client";
import { useState } from "react";
import FormulaireAdresse from "@/components/FormulaireAdresse";
import Panier from "@/components/Panier";
import PaiementSimule from "@/components/PaiementSimule";
import Confirmation from "@/components/Confirmation";

export default function CheckoutPage() {
  const [etape, setEtape] = useState(1);

  const next = () => setEtape((prev) => prev + 1);
  const prev = () => setEtape((prev) => prev - 1);

  return (
    <div className="checkout-wrapper">
      <div className="steps">
        <button disabled={etape === 1} onClick={prev}>⬅</button>
        <span>Étape {etape}/4</span>
        {etape < 4 && <button onClick={next}>➡</button>}
      </div>

      {etape === 1 && <FormulaireAdresse onNext={next} />}
      {etape === 2 && <Panier />}
      {etape === 3 && <PaiementSimule onNext={next} />}
      {etape === 4 && <Confirmation />}
    </div>
  );
}
