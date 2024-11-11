import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./EditUserInfo.module.css";
import icon from "../../assets/sprite.svg";
import {
  updateUserPhoto,
  updateUserProfile,
} from "../../redux/header/operationsHeader.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserStatus,
  selectUserTheme,
} from "../../redux/header/selectors";
import toast, { Toaster } from "react-hot-toast";
import { defaultImages } from "../../constants/global.js";
import { Blocks } from "react-loader-spinner";

Modal.setAppElement("#root");

const EditProfileModal = ({ isOpen, onRequestClose }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be more than 3 chars!")
      .max(50, "Name must be less than 50 chars"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 chars")
      .notRequired(),
  });

  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const userProfile = useSelector((state) => state.userProfile.data);
  const [uploadedPhoto, setUploadedPhoto] = useState(userProfile?.photoUrl);
  const [showPassword, setShowPassword] = useState(false);
  const formikUserProfile = {
    name: userProfile?.name,
    email: userProfile?.email,
    password: "",
  };
  const theme = useSelector(selectUserTheme);

  function getDefaultImage() {
    return defaultImages[theme] || defaultImages.light;
  }

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Acceptable file formats: PNG, JPG, JPEG.");
        return;
      }
      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error(`The file size must not exceed ${maxSizeInMB} mb.`);
        return;
      }
      const formData = new FormData();
      formData.append("photo", file);

      const result = await dispatch(updateUserPhoto(formData));
      if (updateUserPhoto.fulfilled.match(result)) {
        setUploadedPhoto(result.payload.photoUrl);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
        <img
          src={uploadedPhoto || getDefaultImage()}
          alt="Profile"
          className={styles.profileImage}
        />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className={styles.hiddenFileInput}
        />
        {status === "loading" && (
          <div>
            <Blocks
              height="25"
              width="25"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          </div>
        )}
        <label htmlFor="fileInput" className={styles.isOpenFoto}>
          <svg className={styles.openIcon}>
            <use href={`${icon}#add+`}></use>
          </svg>
        </label>
      </div>

      <Formik
        initialValues={formikUserProfile}
        validationSchema={validationSchema}
        onSubmit={(newObj) => {
          const updatedFields = {};

          for (const key in newObj) {
            if (newObj[key] !== formikUserProfile[key]) {
              updatedFields[key] = newObj[key];
            }
          }

          if (Object.keys(updatedFields).length === 0) {
            toast.error("No changes were made");
            return;
          }

          dispatch(updateUserProfile(updatedFields));
          onRequestClose();
        }}
        validateOnBlur={true}
        validateOnChange={false}
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
                  placeholder="Update your password"
                  className={styles.inputField}
                />
                <div className={styles.passwordVisibilityToggle}>
                  {showPassword ? (
                    <svg
                      className={styles.togglePasswordIcon}
                      width="18"
                      height="18"
                      onClick={togglePasswordVisibility}
                    >
                      <use href="/sprite.svg#eye-off" />
                    </svg>
                  ) : (
                    <svg
                      className={styles.togglePasswordIcon}
                      width="18"
                      height="18"
                      onClick={togglePasswordVisibility}
                    >
                      <use href="/sprite.svg#eye" />
                    </svg>
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessagePassword}
                />
              </div>
            </label>
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </Modal>
  );
};

export default EditProfileModal;
