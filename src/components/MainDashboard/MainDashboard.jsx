import css from "./MainDashboard.module.css";
import React, { useId } from "react";
import Modal from "react-modal";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const IconPlus = ({ id }) => {
  <svg>
    <use xlinkHref={`../../assets/sprite.svg#${id}`} />
  </svg>;
};

const IconClose = ({ id }) => {
  <svg>
    <use xlinkHref={`../../assets/sprite.svg#${id}`} />
  </svg>;
};

const columnSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too short").max(20, "Too long").required(),
});

export default function MainDashboard() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const columnId = useId();

  return (
    <>
      <button className={css.button} onClick={openModal}>
        <IconPlus className={css.plus} id="icon-plus" />
        Add column
      </button>

      <Modal
        className={css.modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2 className={css.title}>Add column</h2>
        <button onClick={closeModal}>
          <IconClose className={css.plus} id="icon-close" />
        </button>
        <Formik
          initialValues={{
            username: "",
          }}
          onSubmit={(values, actions) => {
            // onAdd({
            //     id: Date.now().toString(),
            //     name: values.username,
            // });
            actions.resetForm();
          }}
          validationSchema={columnSchema}
        >
          <Form>
            <Field name="column" id={columnId} />
            <ErrorMessage className={css.span} name="column" component="span" />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}
