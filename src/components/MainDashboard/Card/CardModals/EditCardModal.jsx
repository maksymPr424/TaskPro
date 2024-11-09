import * as Yup from "yup";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "../Card.module.css";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PRIORITIES = {
  WITHOUT: "Without priority",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const cardSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short")
    .max(100, "Too long")
    .required("Required"),
  description: Yup.string().min(3, "Too Short").max(300, "Too long"),
  calendar: Yup.date().min(new Date()),
  priority: Yup.string().oneOf(Object.values(PRIORITIES)),
});

export const EditCardModal = ({
  isOpen,
  onClose,
  onSubmit,
  cardId,
  editingCard,
}) => {
  if (!editingCard) return null;

  return (
    <Modal className={css.addModal} isOpen={isOpen} onRequestClose={onClose}>
      <h2 className={css.modalTitle}>Edit card</h2>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.close} width="18" height="18">
          <use href="/sprite.svg#icon-close" />
        </svg>
      </button>
      <Formik
        initialValues={{
          title: editingCard.title || "",
          description: editingCard.description || "",
          calendar: editingCard.calendar
            ? new Date(editingCard.calendar)
            : new Date(),
          priority: editingCard.priority || PRIORITIES.WITHOUT,
        }}
        validationSchema={cardSchema}
        onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Field className={css.modalInputTitle} name="title" id={cardId} />
            <ErrorMessage className={css.error} name="title" component="span" />

            <Field
              className={css.textarea}
              as="textarea"
              cols="30"
              rows="10"
              name="description"
              id={cardId}
            />
            <ErrorMessage
              className={css.error}
              name="description"
              component="span"
            />

            <div className={css.priorityContainer}>
              <h3 className={css.modalSubtitle}>Priority</h3>
              <div className={css.priority}>
                <label className={css.priorityWithout}>
                  <Field
                    type="radio"
                    name="priority"
                    value={PRIORITIES.WITHOUT}
                    className={css.priorityInput}
                  />
                </label>
                <label className={css.priorityLow}>
                  <Field
                    type="radio"
                    name="priority"
                    value={PRIORITIES.LOW}
                    className={css.priorityInput}
                  />
                </label>
                <label className={css.priorityMedium}>
                  <Field
                    type="radio"
                    name="priority"
                    value={PRIORITIES.MEDIUM}
                    className={css.priorityInput}
                  />
                </label>
                <label className={css.priorityHigh}>
                  <Field
                    type="radio"
                    name="priority"
                    value={PRIORITIES.HIGH}
                    className={css.priorityInput}
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 className={css.modalSubtitle}>Deadline</h3>
              <DatePicker
                selected={values.calendar}
                onChange={(date) => setFieldValue("calendar", date)}
                className={css.datepicker}
                dateFormat="EEEE, MMMM, d"
                minDate={new Date()}
              />
              <ErrorMessage
                className={css.error}
                name="calendar"
                component="span"
              />
            </div>

            <button className={css.modalButton} type="submit">
              <svg className={css.plusModal} width="14" height="14">
                <use href="/sprite.svg#icon-plus" />
              </svg>
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

EditCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
  editingCard: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.oneOf(Object.values(PRIORITIES)),
    calendar: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }),
};
