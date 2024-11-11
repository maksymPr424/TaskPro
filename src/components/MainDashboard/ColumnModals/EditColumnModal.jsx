import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "../MainDashboard.module.css";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";

const columnSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("Required"),
});

export const EditColumnModal = ({
  isOpen,
  onClose,
  onSubmit,
  columnId,
  editingColumn,
}) => {
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "transparent",
          zIndex: 10,
        },
      }}
    >
      <h2 className={css.title}>Edit column</h2>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.close} width="18" height="18">
          <use href="/sprite.svg#icon-close" />
        </svg>
      </button>
      <Formik
        initialValues={{ title: editingColumn?.title || "" }}
        validationSchema={columnSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <Field className={css.input} name="title" id={`${columnId}-edit`} />
          <ErrorMessage className={css.error} name="title" component="span" />
          <button className={css.modalButton} type="submit">
            <FaPlus className={css.plusModal} />
            Edit
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

EditColumnModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
  editingColumn: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
};
