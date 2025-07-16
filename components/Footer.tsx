import Link from "next/link";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
                <Link href="/">
<img src="/logo.png" alt="logo" style={{ width: "220px", height: "170px" }} />
        </Link>       
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4>Produits</h4>
          <Link href="#">Jeux</Link>
          <Link href="#">Nouveautés</Link>
          <Link href="#">Promotions</Link>
        </div>
        <div className="footer-column">
          <h4>Entreprise</h4>
          <Link href="#">À propos</Link>
          <Link href="#">Partenaires</Link>
          <Link href="#">Presse</Link>
        </div>
        <div className="footer-column">
          <h4>Aide</h4>
          <Link href="#">FAQ</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
