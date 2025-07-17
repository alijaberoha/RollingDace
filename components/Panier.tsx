"use client";

import "../styles/panier.css";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  incrementerQuantite,
  decrementerQuantite,
  supprimerDuPanier,
} from "@/features/panierSlice";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  hideCommanderButton?: boolean;
};

export default function Panier({ isOpen, onClose, hideCommanderButton }: Props) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.panier);
  const user = useAppSelector((state) => state.auth.user);

  // 🔢 Total avant réduction
  const totalSansReduc = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 💸 Total avec -50% si membre
  const total = user?.abonnement ? totalSansReduc * 0.5 : totalSansReduc;

  // ❌ Empêche le scroll du body quand le panier est ouvert
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    // if (isOpen) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "";
    // }

    return () => {
      window.removeEventListener("keydown", handleKey);
    //   document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="cart-backdrop" onClick={onClose} />}

      <div className={`cart-modal ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <div className="title">
            <h2>
              <FaShoppingCart style={{ cursor: "pointer" }} /> --Votre panier
            </h2>
          </div>
          <button onClick={onClose}>✕</button>
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
    </>
  );
}
