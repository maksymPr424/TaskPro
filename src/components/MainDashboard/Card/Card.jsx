import { useDispatch, useSelector } from "react-redux";
import {
  selectCards,
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

export default function Card() {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [addCardModalIsOpen, setAddCardModalIsOpen] = useState(false);
  const [editCardModalIsOpen, setEditCardModalIsOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const cardId = useId();

  useEffect(() => {
    dispatch(getCard());
  }, [dispatch]);

  const handleAddCard = (values, { resetForm }) => {
    dispatch(
      addCard({
        title: values.title,
        description: values.description,
        calendar: values.calendar,
        priority: values.priority,
      })
    )
      .unwrap()
      .then(() => {
        setAddCardModalIsOpen(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to add card:", error);
      });
  };

  const startEditCard = (card) => {
    setEditingCard({
      id: card.id.toString(),
      title: card.title,
      description: card.description,
      calendar: new Date(card.calendar),
      priority: card.priority,
    });
    setEditCardModalIsOpen(true);
  };

  const handleEditCard = (values, { resetForm }) => {
    dispatch(
      editCard({
        id: editingCard.id,
        title: values.title,
        description: values.description,
        calendar: values.calendar,
        priority: values.priority,
      })
    )
      .unwrap()
      .then(() => {
        setEditCardModalIsOpen(false);
        setEditingCard(null);
        resetForm();
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
                  ? css.priorityWithout
                  : card.priority === PRIORITIES.LOW
                  ? css.priorityLow
                  : card.priority === PRIORITIES.MEDIUM
                  ? css.priorityMedium
                  : card.priority === PRIORITIES.HIGH
                  ? css.priorityHigh
                  : ""
              }`}
              key={card.id}
            >
              <h3 className={css.title}>{card.title}</h3>
              <p className={css.text}>{card.description} </p>
              <div className={css.subcontainer}>
                <div>
                  <h4 className={css.subtitle}>Priority</h4>
                  {card.priority === PRIORITIES.WITHOUT && (
                    <label className={`${css.priority} ${css.priorityWithout}`}>
                      <input
                        type="radio"
                        name="priority"
                        value={PRIORITIES.WITHOUT}
                        checked={card.priority === PRIORITIES.WITHOUT}
                        readOnly
                      />
                      <span className={css.radioCustom}></span>
                    </label>
                  )}
                  {card.priority === PRIORITIES.LOW && (
                    <label className={`${css.priority} ${css.priorityLow}`}>
                      <input
                        type="radio"
                        name="priority"
                        value={PRIORITIES.LOW}
                        checked={card.priority === PRIORITIES.LOW}
                        readOnly
                      />
                      <span className={css.radioCustom}></span>
                    </label>
                  )}
                  {card.priority === PRIORITIES.MEDIUM && (
                    <label className={`${css.priority} ${css.priorityMedium}`}>
                      <input
                        type="radio"
                        name="priority"
                        value={PRIORITIES.MEDIUM}
                        checked={card.priority === PRIORITIES.MEDIUM}
                        readOnly
                      />
                      <span className={css.radioCustom}></span>
                    </label>
                  )}
                  {card.priority === PRIORITIES.HIGH && (
                    <label className={`${css.priority} ${css.priorityHigh}`}>
                      <input
                        type="radio"
                        name="priority"
                        value={PRIORITIES.HIGH}
                        checked={card.priority === PRIORITIES.HIGH}
                        readOnly
                      />
                      <span className={css.radioCustom}></span>
                    </label>
                  )}
                </div>

                <div>
                  <h4 className={css.subtitle}>Deadline</h4>
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
        onSubmit={(values, formikHelpers) =>
          handleEditCard(values, formikHelpers)
        }
        cardId={cardId}
        editingCard={editingCard}
      />
    </div>
  );
}
