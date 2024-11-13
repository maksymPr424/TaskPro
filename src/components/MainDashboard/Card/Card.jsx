import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveBoardId,
  selectColumns,
  selectError,
  selectIsLoading,
} from "../../../redux/boards/selectors";
import { useId, useRef, useState } from "react";
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
import { selectColumnsForRender } from "../../../redux/boards/sliceHeaderDashboard/filtersSlice";
import { ExpandableCard } from "../ExpandableCard";

export default function Card({ columnId }) {
  const dispatch = useDispatch();

  const boardId = useSelector(selectActiveBoardId);
  const columnWithAllTasks = useSelector(selectColumns);
  const filteredColumn = useSelector(selectColumnsForRender);

  const columns =
    filteredColumn.length === 0 ? columnWithAllTasks : filteredColumn;

  const cards = columns.filter(({ _id }) => _id === columnId)[0]?.tasks;

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [addCardModalIsOpen, setAddCardModalIsOpen] = useState(false);
  const [editCardModalIsOpen, setEditCardModalIsOpen] = useState(false);
  const [editCardColumnModalIsOpen, setEditCardColumnModalIsOpen] =
    useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [editingCardColumn, setEditingCardColumn] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const moveCardButtonRefs = useRef([]);
  const cardId = useId();

  const handleAddCard = (values) => {
    if (!values.priority) {
      values.priority = "none";
    }
    console.log(values);

    const priority = values.priority.toLowerCase();

    const taskData = {
      title: values.title.trim(),
      content: values.content.trim(),
      deadline: new Date(values.deadline),
      priority,
    };

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

  const startEditCardColumn = (card, index) => {
    setEditingCardColumn({ id: card._id });
    setEditCardColumnModalIsOpen(true);

    const buttonRef = moveCardButtonRefs.current[index];
    if (buttonRef) {
      const { top, left, height } = buttonRef.getBoundingClientRect();
      setModalPosition({ top: top + height + 10, left });
    }
  };

  const startEditCard = (card) => {
    const priority = card.priority.toLowerCase();
    setEditingCard({
      id: card._id,
      title: card.title.trim(),
      content: card.content.trim(),
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
  const DAY = 24 * 60 * 60 * 1000;

  const handleEditCard = (values) => {
    // if (!editingCard?._id) {
    //   console.error("No card selected for editing");
    //   return;
    // }

    const priority = values.priority.toLowerCase();
    console.log(values);

    const updateData = {
      title: values.title.trim(),
      content: values.content.trim(),
      deadline: new Date(values.deadline),
      priority,
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

  const COLORS = {
    none: "var(--none-priority)",
    low: "var(--low-priority)",
    medium: "var(--medium-priority)",
    high: "var(--base-green-violet)",
  };

  const PRIORITIES = {
    NONE: "none",
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
  };

  const sectionStyles = {
    position: "relative",
  };

  const getSpanColor = (priority) => {
    return COLORS[priority];
  };

  const makeFirstLetterBig = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {isLoading ? (
          <div className={css.loading}>Loading...</div>
        ) : (
          cards.map((card, index) => (
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
              style={sectionStyles}
            >
              <h3 className={css.title}>{card.title}</h3>
              <ExpandableCard {...card} />
              <div className={css.subcontainer}>
                <div className={css.leftCardInfo}>
                  <div>
                    <h4 className={css.subtitle}>Priority</h4>
                    <label className={css.radioText}>
                      <span
                        className={css.radioBtn}
                        style={{
                          backgroundColor: ` ${getSpanColor(card.priority)}`,
                        }}
                      ></span>
                      <p className={css.priorityLabelText}>
                        {makeFirstLetterBig(card.priority)}
                      </p>
                    </label>
                  </div>

                  <div>
                    <h4 className={css.subtitle}>Deadline</h4>
                    <p className={css.deadlineText}>
                      {format(new Date(Date.parse(card.deadline)), "d/MM/yy")}
                    </p>
                  </div>
                </div>

                <div className={css.iconContainer}>
                  {new Date(card.deadline) - new Date() <= DAY ? (
                    <div className={css.bellContainer}>
                      <svg className={css.deadlineBell} width="16" height="16">
                        <use href="/sprite.svg#bell" />
                      </svg>
                      <span className={css.bellShadow}></span>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    ref={(el) => (moveCardButtonRefs.current[index] = el)}
                    className={css.iconButtons}
                    onClick={() => startEditCardColumn(card, index)}
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
                      <use href="/sprite.svg#trash" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className={css.modalOpen}>
                <ChangeColumnModal
                  isOpen={editCardColumnModalIsOpen}
                  onClose={() => setEditCardColumnModalIsOpen(false)}
                  onSubmit={handleEditColumnCard}
                  columnId={columnId}
                  editingCard={editingCardColumn}
                  contentLabel="ChangeColumnModal"
                  position={modalPosition}
                />
              </div>
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
