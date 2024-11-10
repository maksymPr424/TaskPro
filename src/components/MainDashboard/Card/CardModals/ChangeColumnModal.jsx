import Modal from "react-modal";
import css from "../../MainDashboard.module.css";
import { useSelector } from "react-redux";
import { selectColumns } from "../../../../redux/boards/selectors";

export const ChangeColumnModal = ({
  isOpen,
  onClose,
  onSubmit,
  columnId,
  editingCard,
}) => {
  const columns = useSelector(selectColumns);

  return (
    <Modal
      className={`${css.modal} ${css.modalChangeColumn}`}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <ul className={css.changeColumnList}>
        {columns.map(({ _id, title }) => (
          <li key={_id} className={css.changeColumnItem}>
            <button
              className={`${css.changeColumnBtn} ${
                columnId === _id ? css.active : ""
              }`}
              onClick={() =>
                onSubmit({
                  columnId: _id,
                  taskId: editingCard.id,
                  oldColumnId: columnId,
                })
              }
            >
              <p className={css.columnsTitle}>{title}</p>
              <svg className={css.move} width="16" height="16">
                <use
                  className={css.move}
                  href="/sprite.svg#icon-arrow-circle-broken-right"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};
