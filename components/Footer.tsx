import Link from "next/link";
import "../styles/footer.css";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <Link href="/">
            <img src="/logo.png" alt="logo" style={{ width: "220px", height: "170px" }} />
          </Link>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaInstagram /></a>
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

      <div className="footer-bottom">
        <p>Site créé par Ali à but éducatif (MolenGeek) - © {new Date().getFullYear()} Rolling Dice – Tous droits réservés</p>
        <div className="dev-icons">
          <a href="https://github.com/ton-profil" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/ton-profil" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </>
  );
}
