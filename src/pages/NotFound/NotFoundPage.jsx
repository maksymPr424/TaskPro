import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <h1>Page not found</h1>
      <Link className={styles.homeLink} to='/'>
        Go to Home page
      </Link>
    </div>
  );
}
