import styles from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import svgSprite from "./../../assets/sprite.svg";
import * as Yup from "yup";

const validateLoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]+$/,
      "Only latin letters, numbers, and special characters, without spaces."
    )
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must not exceed 64 characters"),
});

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validateLoginFormSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    reset();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.formWrapper}>
      <nav className={styles.navigation}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          to="/auth/register"
        >
          Registration
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          to="/auth/login"
        >
          Log In
        </NavLink>
      </nav>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            <input
              {...register("email")}
              type="text"
              placeholder="Enter your email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </label>
          <label className={styles.label}>
            <input
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
            <span
              className={styles.togglePasswordWrapper}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <svg
                  className={styles.togglePasswordIcon}
                  width="18"
                  height="18"
                >
                  <use href={`${svgSprite}#eye-off`} />
                </svg>
              ) : (
                <svg
                  className={styles.togglePasswordIcon}
                  width="18"
                  height="18"
                >
                  <use href={`${svgSprite}#eye`} />
                </svg>
              )}
            </span>
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Log In Now
        </button>
      </form>
    </div>
  );
}
