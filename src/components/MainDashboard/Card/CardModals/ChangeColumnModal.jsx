import { Modal, Backdrop, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectColumns } from '../../../../redux/boards/selectors';
import css from '../../MainDashboard.module.css';

export const ChangeColumnModal = ({
  isOpen,
  onClose,
  onSubmit,
  columnId,
  editingCard,
  position,
}) => {
  const columns = useSelector(selectColumns);
  if (!editingCard) return null;

  const modalStyles = {
    position: 'absolute',
    top: position.top,
    left: position.left,
    padding: '20px',
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    zIndex: 1300,
    boxShadow: 3,
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='change-column-modal'
      aria-describedby='modal-to-change-column'
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
      }}>
      <Box sx={modalStyles}>
        <p className={css.modalMoveHeading}>Select a column:</p>
        <ul className={css.changeColumnList}>
          {columns.map(({ _id, title }) => (
            <li key={_id} className={css.changeColumnItem}>
              <button
                className={`${css.changeColumnBtn} ${
                  columnId === _id ? css.active : ''
                }`}
                onClick={() =>
                  onSubmit({
                    columnId: _id,
                    taskId: editingCard.id,
                    oldColumnId: columnId,
                  })
                }>
                <p className={css.columnsTitle}>{title}</p>
                <svg className={css.move} width='16' height='16'>
                  <use
                    className={css.move}
                    href='/sprite.svg#icon-arrow-circle-broken-right'
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </Box>
    </Modal>
  );
};
