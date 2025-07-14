"use client";
import "../styles/panier.css";
import { useEffect } from "react";
import "../styles/panier.css"; // tu peux créer ce fichier à côté
import { FaShoppingCart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { incrementerQuantite, decrementerQuantite, supprimerDuPanier } from "@/features/panierSlice";
import Link from "next/link";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  hideCommanderButton?: boolean;
};


export default function Panier({ isOpen, onClose, hideCommanderButton }: Props) {
    const dispatch = useAppDispatch(); // ✅ tu avais oublié ça
  const { items } = useAppSelector((state) => state.panier);
  
    const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
  <div className={`cart-modal ${isOpen ? "open" : ""}`}>
    <div className="cart-header">
        <div className="title">
                  <h2>                  <FaShoppingCart
            style={{ cursor: "pointer" }}
          />  --Votre panier </h2>  
        </div>      <button onClick={onClose}>✕</button>
    </div>

    <div className="cart-content">
      {items.length === 0 ? (
        <p>Aucun article pour le moment.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.name} width={50} />
            <div className="info">
              <p>{item.name}</p>
              <p>{item.price} €</p>
              <div className="quantity-controls">
                <button onClick={() => dispatch(decrementerQuantite(item.id))}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(incrementerQuantite(item.id))}>+</button>
              </div>
            </div>
            <button onClick={() => dispatch(supprimerDuPanier(item.id))}>🗑</button>
          </div>
        ))
      )}
    </div>
      {items.length > 0 && (
        <div className="cart-footer">
          <div className="total">
            <strong>Total :</strong> {total.toFixed(2)} €
          </div>
{!hideCommanderButton && (
  <Link href="/checkout">
    <button className="checkout-btn">Commander</button>
  </Link>
)}

        </div>
      )}
  </div>
);
}