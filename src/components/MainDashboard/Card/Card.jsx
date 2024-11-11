import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveBoardId,
  selectColumns,
  selectError,
  selectIsLoading,
} from "../../../redux/boards/selectors";
import { useEffect, useId, useState } from "react";
import {
  addCard,
  deleteCard,
  editCard,
  editCardColumn,
} from "../../../redux/boards/operations";
import css from "./Card.module.css";
import { AddCardModal } from "./CardModals/AddCardModal";
import { EditCardModal } from "./CardModals/EditCardModal";
import { FaPlus } from "react-icons/fa6";
import { format } from "date-fns";
import { ChangeColumnModal } from "./CardModals/ChangeColumnModal";
import {
  deleteTask,
  updateTask,
  updateTaskColumn,
} from "../../../redux/boards/slice";

export default function Card({ columnId }) {
  const dispatch = useDispatch();

  const boardId = useSelector(selectActiveBoardId);

  const cards = useSelector(selectColumns).filter(
    ({ _id }) => _id === columnId
  )[0].tasks;

  console.log(cards);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [addCardModalIsOpen, setAddCardModalIsOpen] = useState(false);
  const [editCardModalIsOpen, setEditCardModalIsOpen] = useState(false);
  const [editCardColumnModalIsOpen, setEditCardColumnModalIsOpen] =
    useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [editingCardColumn, setEditingCardColumn] = useState(null);

  const cardId = useId();

  const handleAddCard = (values) => {
    const priority = values.priority.toLowerCase();

    const taskData = {
      title: values.title,
      content: values.content,
      deadline: new Date(values.deadline),
      priority,
      // calendar: values.calendar ? new Date(values.calendar) : null,
    };

    if (!taskData.content) delete taskData.content;
    dispatch(
      addCard({
        boardId,
        columnId,
        taskData,
      })
    )
      .unwrap()
      .then(() => {
        setAddCardModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add card:", error);
      });
  };

  const startEditCardColumn = (card) => {
    setEditingCardColumn({
      id: card._id,
    });
    setEditCardColumnModalIsOpen(true);
  };

  const startEditCard = (card) => {
    const priority = card.priority.toLowerCase();
    setEditingCard({
      id: card._id,
      title: card.title,
      content: card.content,
      deadline: new Date(card.deadline).toISOString(),
      priority,
    });
    setEditCardModalIsOpen(true);
  };

  const handleEditColumnCard = (values) => {
    dispatch(
      updateTaskColumn({
        taskId: editingCardColumn.id,
        columnId: values.columnId,
        oldColumnId: values.oldColumnId,
      })
    );

    setEditCardColumnModalIsOpen(false);
    setEditingCard(null);

    dispatch(
      editCardColumn({
        taskId: values.taskId,
        updateData: {
          columnId: values.columnId,
          oldColumnId: values.oldColumnId,
        },
      })
    )
      .unwrap()
      .catch((error) => {
        console.error("Failed to move card:", error);
      });
  };

  const handleEditCard = (values) => {
    // if (!editingCard?._id) {
    //   console.error("No card selected for editing");
    //   return;
    // }

    const priority = values.priority.toLowerCase();

    const updateData = {
      title: values.title,
      content: values.content,
      deadline: values.deadline
        ? new Date(values.deadline)
        : new Date(Date.now() + 24 * 60 * 60 * 1000),
      priority: priority || PRIORITIES.WITHOUT,
    };

    if (!updateData.content) delete updateData.content;
    const updatedCard = {
      taskId: editingCard.id,
      updateData,
    };

    dispatch(updateTask({ taskId: editingCard.id, columnId, updateData }));

    setEditCardModalIsOpen(false);
    setEditingCard(null);

    dispatch(editCard(updatedCard))
      .unwrap()
      .catch((error) => {
        console.error("Failed to edit card:", error);
      });
  };

  const handleDeleteCard = (taskId) => {
    dispatch(deleteTask({ columnId, taskId }));
    dispatch(deleteCard({ columnId, taskId }))
      .unwrap()
      .catch((error) => {
        console.error("Failed to delete card:", error);
      });
  };

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
  }

  const PRIORITIES = {
    NONE: "none",
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {isLoading ? (
          <div className={css.loading}>Loading...</div>
        ) : (
          cards.map((card) => (
            <li
              className={`${css.item} ${
                card.priority === PRIORITIES.NONE
                  ? css.priorityNoneItem
                  : card.priority === PRIORITIES.LOW
                  ? css.priorityLowItem
                  : card.priority === PRIORITIES.MEDIUM
                  ? css.priorityMediumItem
                  : card.priority === PRIORITIES.HIGH
                  ? css.priorityHighItem
                  : ""
              }`}
              key={card._id}
            >
              <h3 className={css.title}>{card.title}</h3>
              <p className={css.text}>{card.description} </p>
              <div className={css.subcontainer}>
                <div>
                  <h4 className={css.subtitle}>Priority</h4>
                  <label className={css[`priority${card.priority}`]}>
                    <input
                      type="radio"
                      name="priority"
                      value={card.priority}
                      checked={true}
                      readOnly
                      disabled
                    />
                  </label>
                </div>

                <div>
                  <h4 className={css.subtitle}>Deadline</h4>
                  <p className={css.deadlineText}>
                    {format(new Date(Date.parse(card.deadline)), "d/MM/yy")}
                  </p>
                </div>

                <div className={css.iconContainer}>
                  <button
                    className={css.iconButtons}
                    onClick={() => startEditCardColumn(card)}
                  >
                    <svg className={css.move} width="16" height="16">
                      <use href="/sprite.svg#icon-arrow-circle-broken-right" />
                    </svg>
                  </button>
                  <button
                    className={css.iconButtons}
                    onClick={() => startEditCard(card)}
                  >
                    <svg className={css.edit} width="16" height="16">
                      <use href="/sprite.svg#pencil" />
                    </svg>
                  </button>
                  <button
                    className={css.iconButtons}
                    onClick={() => handleDeleteCard(card._id)}
                  >
                    <svg className={css.delete} width="16" height="16">
                      <use href="/sprite.svg#icon-trash" />
                    </svg>
                  </button>
                </div>
              </div>

              <ChangeColumnModal
                isOpen={editCardColumnModalIsOpen}
                onClose={() => setEditCardColumnModalIsOpen(false)}
                onSubmit={handleEditColumnCard}
                columnId={columnId}
                editingCard={editingCardColumn}
              />
            </li>
          ))
        )}
      </ul>

      <button
        className={css.button}
        onClick={() => setAddCardModalIsOpen(true)}
      >
        <FaPlus className={css.plusModal} />
        Add another card
      </button>
      <EditCardModal
        isOpen={editCardModalIsOpen}
        onClose={() => setEditCardModalIsOpen(false)}
        onSubmit={handleEditCard}
        cardId={cardId}
        editingCard={editingCard}
      />
      <AddCardModal
        isOpen={addCardModalIsOpen}
        onClose={() => setAddCardModalIsOpen(false)}
        onSubmit={handleAddCard}
        cardId={cardId}
      />
    </div>
  );
}
