import { useDispatch, useSelector } from "react-redux";
import {
  selectCard,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AddCardModal } from "./CardModals/AddCardModal";
import { EditCardModal } from "./CardModals/EditCardModal";

const IconPlus = (id) => (
  <svg>
    <use xlinkHref={`../../../assets/sprite.svg#${id}`} />
  </svg>
);

const IconArrow = (id) => (
  <svg>
    <use xlinkHref={`../../../assets/sprite.svg#${id}`} />
  </svg>
);

const IconEdit = (id) => (
  <svg>
    <use xlinkHref={`../../../assets/sprite.svg#${id}`} />
  </svg>
);

const IconDelete = (id) => (
  <svg>
    <use xlinkHref={`../../../assets/sprite.svg#${id}`} />
  </svg>
);

export default function Card() {
  const dispatch = useDispatch();
  const cards = useSelector(selectCard);
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
    setEditingCard(card);
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <ul className={css.list}>
          {isLoading ? (
            <div className={css.loading}>Loading...</div>
          ) : (
            cards.map((card) => {
              <li className={css.item} key={card.id}>
                <h3 className={css.title}>{card.title}</h3>
                <p className={css.text}>{card.description} </p>
                <div className={css.container}>
                  <div>
                    <h4 className={css.subtitle}>Priority</h4>
                    <label className={css.label}>
                      <input className={css.input} type="checkbox" />
                      {card.priority}
                    </label>
                  </div>

                  <div>
                    <h4 className={css.subtitle}>Deadline</h4>
                    <DatePicker defaultValue={new Date()} />
                  </div>

                  <div className={css.iconContainer}>
                    <button>
                      <IconArrow id="icon-arrow-circle-broken-right" />
                    </button>
                    <button onClick={() => startEditCard(card)}>
                      <IconEdit className={css.edit} id="icon-pencil" />
                    </button>
                    <button onClick={() => handleDeleteCard(card.id)}>
                      <IconDelete className={css.delete} id="icon-trash" />
                    </button>
                  </div>
                </div>
              </li>;
            })
          )}
        </ul>

        <button className={css.button}>
          <IconPlus className={css.plus} id="icon-plus" />
          Add Card
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
    </LocalizationProvider>
  );
}
