import * as Yup from "yup";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "../Card.module.css";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PRIORITIES = {
  WITHOUT: "none",
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const cardSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short")
    .max(20, "Too long")
    .required("Required"),
  content: Yup.string().min(3, "Too Short").max(300, "Too long"),
  deadline: Yup.date().min(new Date()),
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
    <Modal
      className={css.addModal}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "transparent",
          zIndex: 10,
        },
      }}
    >
      <h2 className={css.modalTitle}>Add card</h2>
      <button onClick={onClose} className={css.closeButton}>
        <svg className={css.close} width="18" height="18">
        <use href="/sprite.svg#x"></use>
        </svg>
      </button>
      <Formik
        initialValues={{
          title: "",
          content: "",
          deadline: new Date(),
          priority: PRIORITIES.NONE,
        }}
        validationSchema={cardSchema}
        onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
      >
        <Form>
          <Field className={css.modalInputTitle} name="title" id={cardId} placeholder="Title"/>
          <ErrorMessage className={css.error} name="title" component="span" />

          <Field
            className={css.textarea}
            as="textarea"
            cols="30"
            rows="10"
            name="content"
            id={cardId}
            placeholder="Description"
          />
          <ErrorMessage className={css.error} name="content" component="span" />

          <div className={css.priorityContainer}>
            <h3 className={css.modalSubtitle}>Priority</h3>
            <div className={css.priority}>
              <label className={css.radioText}>
                <Field
                  type="radio"
                  name="priority"
                  value={PRIORITIES.NONE}
                  className={`${css.priorityInput}`}
                />
                <span
                  className={css.radioBtn}
                  style={{
                    backgroundColor: "var(--none-priority)",
                  }}
                ></span>
              </label>
              <label className={css.radioText}>
                <Field
                  type="radio"
                  name="priority"
                  value={PRIORITIES.LOW}
                  className={css.priorityInput}
                />
                <span
                  className={css.radioBtn}
                  style={{ backgroundColor: "var(--low-priority)" }}
                ></span>
              </label>
              <label className={css.radioText}>
                <Field
                  type="radio"
                  name="priority"
                  value={PRIORITIES.MEDIUM}
                  className={css.priorityInput}
                />
                <span
                  className={css.radioBtn}
                  style={{ backgroundColor: "var(--medium-priority)" }}
                ></span>
              </label>
              <label className={css.radioText}>
                <Field
                  type="radio"
                  name="priority"
                  value={PRIORITIES.HIGH}
                  className={css.priorityInput}
                />
                <span
                  className={css.radioBtn}
                  style={{ backgroundColor: "var(--base-green-violet)" }}
                ></span>
              </label>
            </div>
          </div>

          <div>
            <h3 className={css.modalSubtitle}>Deadline</h3>
            <Field name="deadline">
              {({ form }) => (
                <DatePicker
                  selected={form.values.deadline}
                  onChange={(date) => form.setFieldValue("deadline", date)}
                  className={css.datepicker}
                  dateFormat="MMMM, d"
                  minDate={new Date()}
                  customInput={
                    <input
                      // readOnly={true}
                      value={
                        form.values.deadline
                          ? formatDate(form.values.deadline)
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

// AddCardModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   cardId: PropTypes.string.isRequired,
// };
