import { useState, useId, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./MainDashboard.module.css";
import {
  addColumn,
  deleteColumn,
  editColumn,
} from "../../redux/boards/operations";
import {
  selectColumns,
  selectIsLoading,
  selectError,
  selectActiveBoardId,
} from "../../redux/boards/selectors";
import { AddColumnModal } from "./ColumnModals/AddColumnModal";
import { EditColumnModal } from "./ColumnModals/EditColumnModal";
import Card from "./Card/Card";
import { FaPlus } from "react-icons/fa6";
import ReactModal from "react-modal";
import Loader from "../Loader/Loader";
import { deleteColumnSpeed, updateColumn } from "../../redux/boards/slice";

ReactModal.setAppElement("#root");

export default function MainDashboard() {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const boardId = useSelector(selectActiveBoardId);

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);

  const columnId = useId();

  const handleAddColumn = (values, { resetForm }) => {
    // dispatch(addColumnSpeed({ title: values.title }));
    // resetForm();
    setAddModalIsOpen(false);

    dispatch(addColumn({ title: values.title, boardId }))
      .unwrap()
      .then(() => {
        // setAddModalIsOpen(false);
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
    dispatch(updateColumn({ id: editingColumn._id, title: values.title }));

    setEditModalIsOpen(false);
    setEditingColumn(null);
    dispatch(
      editColumn({ id: editingColumn._id, title: values.title, boardId })
    )
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to edit column:", error);
      });
  };

  const handleDeleteColumn = (id) => {
    dispatch(deleteColumnSpeed(id));
    dispatch(deleteColumn(id))
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
      <ul className={`${css.columnsContainer} scrollContainer`}>
        {isLoading ? (
          <div className={css.loading}>
            <Loader />
          </div>
        ) : (
          columns.map((column) => (
            <li className={css.columnItem} key={column._id}>
              <div className={css.column}>
                <h3 className={css.titleColumn}>{column.title}</h3>
                <div className={css.columnButtons}>
                  <button
                    className={css.editButton}
                    onClick={() => startEditColumn(column)}
                  >
                    <svg className={css.edit} width="16" height="16">
                      <use href="/sprite.svg#pencil" />
                    </svg>
                  </button>
                  <button
                    className={css.deleteButton}
                    onClick={() => handleDeleteColumn(column._id)}
                  >
                    <svg className={css.delete} width="16" height="16">
                      <use href="/sprite.svg#trash" />
                    </svg>
                  </button>
                </div>
              </div>
              <Card className={css.tasks} columnId={column._id} />
            </li>
          ))
        )}
      </ul>

      <button className={css.button} onClick={() => setAddModalIsOpen(true)}>
        <FaPlus className={css.plus} />
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
