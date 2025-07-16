"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";
import { FaShoppingCart ,FaGem} from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import Panier from "@/components/Panier";
import { RootState } from "@/lib/store";

export default function Nav() {
  const [showPanier, setShowPanier] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // ✅ Total d’articles dans le panier
  const totalArticles = useSelector((state: RootState) =>
    state.panier.items.reduce((acc, item) => acc + item.quantity, 0)
  );

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
          <div style={{ position: "relative" }}>
            <FaShoppingCart
              className={styles.cartIcon}
              onClick={() => setShowPanier(true)}
              style={{ cursor: "pointer" }}
            />
            {totalArticles > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  background: "black",
                  color: "white",
                  fontSize: "12px",
                  borderRadius: "50%",
                  padding: "3px 6px",
                  fontWeight: "bold",
                }}
              >
                {totalArticles}
              </span>
            )}
          </div>

          {!user ? (
            <Link href="/login" className={styles.loginBtn}>Login</Link>
          ) : (
<div className={styles.loginBtn}>
  {user.email.split("@")[0]}
{user.abonnement && (
  <FaGem
    title="Membre premium"
    style={{
      marginLeft: "8px",
      color: "gold",
      fontSize: "18px",
      verticalAlign: "middle"
    }}
  />
)}

  {" | "}
  <button
    onClick={handleLogout}
    style={{
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      textDecoration: "underline"
    }}
  >
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
