import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "../MainDashboard.module.css";
import PropTypes from "prop-types";

const columnSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("Required"),
});

const IconPlus = (id) => (
  <svg>
    <use xlinkHref={`../../assets/sprite.svg#${id}`} />
  </svg>
);

const IconClose = (id) => (
  <svg>
    <use xlinkHref={`../../assets/sprite.svg#${id}`} />
  </svg>
);

export const EditColumnModal = ({
  isOpen,
  onClose,
  onSubmit,
  columnId,
  editingColumn,
}) => {
  return (
    <Modal className={css.modal} isOpen={isOpen} onRequestClose={onClose}>
      <h2 className={css.title}>Edit column</h2>
      <button className={css.closeButton} onClick={onClose}>
        <IconClose className={css.close} id="icon-close" />
      </button>
      <Formik
        initialValues={{ title: editingColumn?.title || "" }}
        validationSchema={columnSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <Field className={css.input} name="title" id={`${columnId}-edit`} />
            <ErrorMessage className={css.error} name="title" component="span" />
            <button
              className={css.modalButton}
              type="submit"
              disabled={isSubmitting}
            >
              <IconPlus className={css.plus} id="icon-plus" />
              {isSubmitting ? "Editing..." : "Edit"}
            </button>
          </Form>
        )}
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
