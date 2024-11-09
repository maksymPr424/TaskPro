import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
} from "../../../redux/main_dashboard/card/cardSelectors";
import { useEffect, useId, useState } from "react";
import {
  addCard,
  deleteCard,
  editCard,
  getCard,
} from "../../../redux/main_dashboard/card/cardOperations";
import css from "./Card.module.css";
import { AddCardModal } from "./CardModals/AddCardModal";
import { EditCardModal } from "./CardModals/EditCardModal";
import { FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function Card({ columnId }) {
  const dispatch = useDispatch();

  const cards = useSelector((state) =>
    state.cards.items.filter((card) => card.columnId === columnId)
  );
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [addCardModalIsOpen, setAddCardModalIsOpen] = useState(false);
  const [editCardModalIsOpen, setEditCardModalIsOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const cardId = useId();

  useEffect(() => {
    dispatch(getCard());
  }, [dispatch]);

  const handleAddCard = (values) => {
    dispatch(
      addCard({
        ...values,
        columnId,
        calendar: values.calendar ? new Date(values.calendar) : null,
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

  const startEditCard = (card) => {
    setEditingCard({
      id: card.id,
      title: card.title,
      description: card.description,
      calendar: card.calendar ? new Date(card.calendar) : null,
      priority: card.priority,
      columnId: card.columnId,
    });
    setEditCardModalIsOpen(true);
  };

  const handleEditCard = (values) => {
    if (!editingCard?.id) {
      console.error("No card selected for editing");
      return;
    }

    const updatedCard = {
      id: editingCard.id,
      title: values.title,
      description: values.description,
      calendar: values.calendar ? new Date(values.calendar) : null,
      priority: values.priority,
      columnId: columnId,
    };

    dispatch(editCard(updatedCard))
      .unwrap()
      .then(() => {
        setEditCardModalIsOpen(false);
        setEditingCard(null);
      })
      .catch((error) => {
        console.error("Failed to edit card:", error);
      });
  };

  const handleDeleteCard = (id) => {
    dispatch(deleteCard(id))
      .unwrap()
      .catch((error) => {
        console.error("Failed to delete card:", error);
      });
  };

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
  }

  const PRIORITIES = {
    WITHOUT: "Without priority",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
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
                card.priority === PRIORITIES.WITHOUT
                  ? css.priorityWithoutItem
                  : card.priority === PRIORITIES.LOW
                  ? css.priorityLowItem
                  : card.priority === PRIORITIES.MEDIUM
                  ? css.priorityMediumItem
                  : card.priority === PRIORITIES.HIGH
                  ? css.priorityHighItem
                  : ""
              }`}
              key={card.id}
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
                    />
                  </label>
                </div>

                <div>
                  <h4 className={css.subtitle}>Deadline</h4>
                  <p className={css.deadlineText}>
                    {(() => {
                      const date = new Date(card.calendar);
                      date.setHours(0, 0, 0, 0);

                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const tomorrow = new Date(today);
                      tomorrow.setDate(tomorrow.getDate() + 1);

                      const dayAfterTomorrow = new Date(today);
                      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

                      const startOfWeek = new Date(today);
                      startOfWeek.setDate(today.getDate() - today.getDay());
                      const endOfWeek = new Date(startOfWeek);
                      endOfWeek.setDate(startOfWeek.getDate() + 6);

                      if (date.getTime() === today.getTime()) {
                        return `Today, ${date.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })}`;
                      } else if (date.getTime() === tomorrow.getTime()) {
                        return `Tomorrow, ${date.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })}`;
                      } else if (
                        date.getTime() === dayAfterTomorrow.getTime()
                      ) {
                        return `Day after tomorrow, ${date.toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                          }
                        )}`;
                      } else if (date > today && date <= endOfWeek) {
                        return `This week, ${date.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })}`;
                      } else if (date > endOfWeek) {
                        return `Next week, ${date.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })}`;
                      }

                      return date.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                      });
                    })()}
                  </p>
                </div>

                <div className={css.iconContainer}>
                  <button className={css.iconButtons}>
                    <svg className={css.move} width="16" height="16">
                      <use href="/sprite.svg#icon-arrow-circle-broken-right" />
                    </svg>
                  </button>
                  <button
                    className={css.iconButtons}
                    onClick={() => startEditCard(card)}
                  >
                    <svg className={css.edit} width="16" height="16">
                      <use href="/sprite.svg#icon-pencil" />
                    </svg>
                  </button>
                  <button
                    className={css.iconButtons}
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <svg className={css.delete} width="16" height="16">
                      <use href="/sprite.svg#icon-trash" />
                    </svg>
                  </button>
                </div>
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

      <AddCardModal
        isOpen={addCardModalIsOpen}
        onClose={() => setAddCardModalIsOpen(false)}
        onSubmit={handleAddCard}
        cardId={cardId}
      />

      <EditCardModal
        isOpen={editCardModalIsOpen}
        onClose={() => setEditCardModalIsOpen(false)}
        onSubmit={handleEditCard}
        cardId={cardId}
        editingCard={editingCard}
      />
    </div>
  );
}

Card.propTypes = {
  columnId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
