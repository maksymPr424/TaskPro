import { useState, useId, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./MainDashboard.module.css";
import {
  getColumn,
  addColumn,
  delateColumn,
  editColumn,
} from "../../redux/main_dashboard/column/columnOperations";
import {
  selectColumns,
  selectIsLoading,
  selectError,
} from "../../redux/main_dashboard/column/columnSelectors";

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

const IconEdit = (id) => (
  <svg>
    <use xlinkHref={`../../assets/sprite.svg#${id}`} />
  </svg>
);

const IconDelete = (id) => (
  <svg>
    <use xlinkHref={`../../assets/sprite.svg#${id}`} />
  </svg>
);

const columnSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("Required"),
});

export default function MainDashboard() {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);

  const columnId = useId();

  useEffect(() => {
    dispatch(getColumn());
  }, [dispatch]);

  const handleAddColumn = (values, { resetForm }) => {
    dispatch(addColumn({ title: values.title }))
      .unwrap()
      .then(() => {
        setAddModalIsOpen(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to add column:", error);
      });
  };

  const handleDeleteColumn = (id) => {
    dispatch(delateColumn(id))
      .unwrap()
      .catch((error) => {
        console.error("Failed to delete column:", error);
      });
  };

  const startEditColumn = (column) => {
    setEditingColumn(column);
    setEditModalIsOpen(true);
  };

  const handleEditColumn = (values, { resetForm }) => {
    dispatch(editColumn({ id: editingColumn.id, title: values.title }))
      .unwrap()
      .then(() => {
        setEditModalIsOpen(false);
        setEditingColumn(null);
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to edit column:", error);
      });
  };

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
  }

  return (
    <div className={css.container}>
      <button className={css.button} onClick={() => setAddModalIsOpen(true)}>
        <IconPlus className={css.plus} id="icon-plus" />
        Add column
      </button>

      <ul className={css.columnsContainer}>
        {isLoading ? (
          <div className={css.loading}>Loading...</div>
        ) : (
          columns.map((column) => (
            <li key={column.id} className={css.column}>
              <h3>{column.title}</h3>
              <div className={css.columnButtons}>
                <button
                  className={css.editButton}
                  onClick={() => startEditColumn(column)}
                >
                  <IconEdit className={css.edit} id="icon-pencil" />
                </button>
                <button
                  className={css.deleteButton}
                  onClick={() => handleDeleteColumn(column.id)}
                >
                  <IconDelete className={css.delete} id="icon-trash" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Add column */}
      <Modal
        className={css.modal}
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
      >
        <h2 className={css.title}>Add column</h2>
        <button
          className={css.closeButton}
          onClick={() => setAddModalIsOpen(false)}
        >
          <IconClose className={css.close} id="icon-close" />
        </button>
        <Formik
          initialValues={{ title: "" }}
          validationSchema={columnSchema}
          onSubmit={handleAddColumn}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field className={css.input} name="title" id={columnId} />
              <ErrorMessage
                className={css.error}
                name="title"
                component="span"
              />
              <button
                className={css.modalButton}
                type="submit"
                disabled={isSubmitting}
              >
                <IconPlus className={css.plus} id="icon-plus" />
                {isSubmitting ? "Adding..." : "Add"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Edit column */}
      <Modal
        className={css.modal}
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <h2 className={css.title}>Edit column</h2>
        <button
          className={css.closeButton}
          onClick={() => setEditModalIsOpen(false)}
        >
          <IconClose className={css.close} id="icon-close" />
        </button>
        <Formik
          initialValues={{ title: editingColumn?.title || "" }}
          validationSchema={columnSchema}
          onSubmit={handleEditColumn}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className={css.input}
                name="title"
                id={`${columnId}-edit`}
              />
              <ErrorMessage
                className={css.error}
                name="title"
                component="span"
              />
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
    </div>
  );
}
