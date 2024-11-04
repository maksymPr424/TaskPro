// EditProfileModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./EditUserInfo.module.css";
import icon from "../../assets/sprite.svg";
import defaultPhoto from "../../img/user.jpg";

Modal.setAppElement("#root");

const EditProfileModal = ({ isOpen, onRequestClose }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be more than 3 chars!")
      .max(50, "Name must be less than 50 chars"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 chars"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <button onClick={onRequestClose} className={styles.closeButton}>
        <svg className={styles.closeIcon}>
          <use href={`${icon}#x`}></use>
        </svg>
      </button>
      <h2 className={styles.modalTitle}>Edit profile</h2>
      <div className={styles.profileImageContainer}>
        <img src={defaultPhoto} alt="Profile" className={styles.profileImage} />
        <button className={styles.isOpenFoto}>
          <svg className={styles.openIcon}>
            <use href={`${icon}#add+`}></use>
          </svg>
        </button>
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          onRequestClose();
        }}
      >
        {() => (
          <Form className={styles.formContainer}>
            <label className={styles.label}>
              <Field
                name="name"
                placeholder="Enter your name"
                className={styles.inputField}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorMessage}
              />
            </label>

            <label className={styles.label}>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                className={styles.inputField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </label>

            <label className={styles.label}>
              <div className={styles.passwordContainer}>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={styles.inputField}
                />
                <svg
                  className={`${styles.passwordVisibilityToggle} ${
                    showPassword ? styles.visible : ""
                  }`}
                  onClick={togglePasswordVisibility}
                >
                  <use href={`${icon}#eye`} />
                </svg>

                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </label>

            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditProfileModal;
