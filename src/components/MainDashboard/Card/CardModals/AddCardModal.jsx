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
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
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
