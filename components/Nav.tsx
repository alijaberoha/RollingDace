"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Panier from "@/components/Panier";

export default function Nav() {
  const [showPanier, setShowPanier] = useState(false);

  return (
    <>
      <header className={styles.navig}>
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: "120px", height: "70px", filter: "invert(1)" }}
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
          <Link href="/login" className={styles.loginBtn}>Login</Link>
        </div>
      </header>

{showPanier && (
  <Panier onClose={() => setShowPanier(false)} isOpen={true} />
)}
    </>
  );
}
