import { useParams } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import NotFoundPage from "../NotFound/NotFoundPage.jsx";
import styles from "./AuthPage.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../../redux/auth/slice.js";

export default function AuthPage() {
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [id, dispatch]);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, [id]);

  return (
    <div className={styles.authPage}>
      <div
        className={styles.formContainer}
        style={{ height: `${formHeight}px` }}>
        <div ref={formRef}>
          {id === "register" ? (
            <RegisterForm />
          ) : id === "login" ? (
            <LoginForm />
          ) : (
            <NotFoundPage />
          )}
        </div>
      </div>
    </div>
  );
}
