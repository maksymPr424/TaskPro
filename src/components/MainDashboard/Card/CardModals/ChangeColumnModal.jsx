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
  if (!editingCard) return null;

  const columns = useSelector(selectColumns);

  const modalStyles = {
    overlay: {
      backgroundColor: "transparent",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    content: {
      position: "unset",
      top: 0 + "px",
      left: 0 + "px",
      // width: "300px",
      // backgroundColor: "white",
      // padding: "20px",
      // borderRadius: "8px",
    },
  };

  return (
    <Modal
      className={`${css.modal} ${css.modalChangeColumn}`}
      // overlayClassName={css.modalOverlay}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
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
