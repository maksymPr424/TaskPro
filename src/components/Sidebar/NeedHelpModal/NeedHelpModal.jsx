import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import css from "./NeedHelpModal.module.css";

const NeedHelpModal = ({ isOpen, onClose }) => {
  const [submitError, setSubmitError] = useState("");

  const initialValues = {
    email: "",
    comment: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter an email address."),
    comment: Yup.string().required("Please enter a comment.")
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('/support', { userEmail: values.email, comment: values.comment });
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to send support request.", error);
      setSubmitError("Failed to send support request.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="Need Help Modal"
      ariaHideApp={false}
    >
      <button className={css.closeButton} onClick={onClose} aria-label="Close modal">
        ×
      </button>
      <h2 className={css.modalName}>Need help</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Field
              type="email"
              name="email"
              placeholder="Email address"
              className={css.input}
            />
            <ErrorMessage name="email" component="p" className={css.error} />
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={css.textarea}
            />
            <ErrorMessage name="comment" component="p" className={css.error} />
            {submitError && <p className={css.error}>{submitError}</p>}
            <button type="submit" className={css.sendButton} aria-label="Send help request">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

NeedHelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NeedHelpModal;