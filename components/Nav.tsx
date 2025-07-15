"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import Panier from "@/components/Panier";

export default function Nav() {
  const [showPanier, setShowPanier] = useState(false);
  const user = useSelector((state: any) => state.auth.user); // 👈 utilisateur
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      <header className={styles.navig}>
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: "120px", height: "70px", filter: "invert(1)", cursor: "pointer" }}
          onClick={() => router.push("/")}
        />
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/produits">Shop</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <FaShoppingCart
            className={styles.cartIcon}
            onClick={() => setShowPanier(true)}
            style={{ cursor: "pointer" }}
          />

          {!user ? (
            <Link href="/login" className={styles.loginBtn}>Login</Link>
          ) : (
            <div className={styles.loginBtn}>
              {user.email.split("@")[0]} |{" "}
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer", textDecoration: "underline" }}>
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </header>

      {showPanier && (
        <Panier onClose={() => setShowPanier(false)} isOpen={true} />
      )}
    </>
  );
}
