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

export const AddCardModal = ({ isOpen, onClose, onSubmit, cardId }) => {
  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    const nextWeek = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    nextWeek.setDate(today.getDate() + 7);

    const isSameDay = (date1, date2) =>
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();

    if (isSameDay(date, today)) {
      return `Today, ${date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}`;
    } else if (isSameDay(date, tomorrow)) {
      return `Tomorrow, ${date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}`;
    } else if (isSameDay(date, nextWeek)) {
      return `Next week, ${date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    }
  };

  return (
    <Modal className={css.addModal} isOpen={isOpen} onRequestClose={onClose}>
      <h2 className={css.modalTitle}>Add card</h2>
      <button onClick={onClose} className={css.closeButton}>
        <svg className={css.close} width="18" height="18">
          <use href="/sprite.svg#icon-close" />
        </svg>
      </button>
      <Formik
        initialValues={{
          title: "",
          description: "",
          calendar: new Date(),
          priority: PRIORITIES.WITHOUT,
        }}
        validationSchema={cardSchema}
        onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)} // Передаємо formikHelpers у onSubmit
      >
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
            <Field name="calendar">
              {({ form }) => (
                <DatePicker
                  selected={form.values.calendar}
                  onChange={(date) => form.setFieldValue("calendar", date)}
                  className={css.datepicker}
                  dateFormat="EEEE, MMMM, d"
                  minDate={new Date()}
                  customInput={
                    <input
                      // readOnly={true}
                      value={
                        form.values.calendar
                          ? formatDate(form.values.calendar)
                          : ""
                      }
                      placeholder="Select a date"
                      readOnly
                      className={css.datepickerInput}
                    />
                  }
                />
              )}
            </Field>
          </div>

          <button className={css.modalButton} type="submit">
            <svg className={css.plusModal} width="14" height="14">
              <use href="/sprite.svg#icon-plus" />
            </svg>
            Add
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

AddCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
};
