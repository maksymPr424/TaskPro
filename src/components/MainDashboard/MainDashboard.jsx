import { useState, useId, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { AddColumnModal } from "./ColumnModals/AddColumnModal";
import { EditColumnModal } from "./ColumnModals/EditColumnModal";
import Card from "./Card/Card";

const IconPlus = (id) => (
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

  const handleDeleteColumn = (id) => {
    dispatch(delateColumn(id))
      .unwrap()
      .catch((error) => {
        console.error("Failed to delete column:", error);
      });
  };

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
  }

  return (
    <div className={css.container}>
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
              <Card className={css.tasks} />
            </li>
          ))
        )}
      </ul>

      <button className={css.button} onClick={() => setAddModalIsOpen(true)}>
        <IconPlus className={css.plus} id="icon-plus" />
        Add column
      </button>

      <AddColumnModal
        isOpen={addModalIsOpen}
        onClose={() => setAddModalIsOpen(false)}
        onSubmit={handleAddColumn}
        columnId={columnId}
      />

      <EditColumnModal
        isOpen={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        onSubmit={handleEditColumn}
        columnId={columnId}
        editingColumn={editingColumn}
      />
    </div>
  );
}
