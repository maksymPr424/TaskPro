import { useParams } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import NotFoundPage from "../NotFound/NotFoundPage.jsx";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const { id } = useParams();

  return (
    <div className={styles.authPage}>
      {id === "register" ? (
        <RegisterForm />
      ) : id === "login" ? (
        <LoginForm />
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
}
