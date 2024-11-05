import styles from "./RegisterForm.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";
import svgSprite from "../../assets/sprite.svg";
import * as Yup from "yup";

const validateRegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]+$/,
      "Only latin letters, numbers, and special characters, without spaces"
    )
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must not exceed 32 characters"),
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
      "Only latin letters, numbers, and special characters, without spaces"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must not exceed 64 characters"),
});

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validateRegisterFormSchema),
    mode: "onSubmit",
  });

  const onSubmit = data => {
    dispatch(registerUser(data));
    reset();
  };

  return (
    <div className={styles.formWrapper}>
      <nav className={styles.navigation}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          to='/auth/register'>
          Registration
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          to='/auth/login'>
          Log In
        </NavLink>
      </nav>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            <input
              {...register("name")}
              type='text'
              placeholder='Enter your name'
              className={`${styles.input} ${
                errors.name ? styles.inputError : ""
              }`}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </label>
          <label className={styles.label}>
            <input
              {...register("email")}
              type='text'
              placeholder='Enter your email'
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
              placeholder='Create a password'
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
            <span
              className={styles.togglePasswordWrapper}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              <svg className={styles.togglePasswordIcon} width='18' height='18'>
                <use href={`${svgSprite}#eye`} />
              </svg>
            </span>
          </label>
        </div>
        <button type='submit' className={styles.button}>
          Register Now
        </button>
      </form>
    </div>
  );
}
