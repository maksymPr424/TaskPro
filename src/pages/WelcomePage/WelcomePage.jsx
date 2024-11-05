import user_image from "../../assets/welcome_page_user_image.png";
import styles from "./WelcomePage.module.css";
import svgSprite from "../../assets/sprite.svg";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className={styles.welcomePage}>
      <img className={styles.userImage} src={user_image} alt="user_image" />
      <div className={styles.logoWrapper}>
        <svg className={styles.logoIcon} width="48" height="48">
          <use href={`${svgSprite}#taskpro_logo`}></use>
        </svg>
        <p className={styles.logoTitle}>Task Pro</p>
      </div>
      <div className={styles.welcomeText}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don&rsquo;t wait, start achieving your goals now!
      </div>
      <Link to="/auth/register" className={styles.regLink}>
        Registration
      </Link>
      <Link to="/auth/login" className={styles.loginLink}>
        Log In
      </Link>
    </div>
  );
}
