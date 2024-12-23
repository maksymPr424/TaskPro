import * as Yup from "yup";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "../Card.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PRIORITIES = {
  NONE: "none",
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const DAY = 24 * 60 * 60 * 1000;

const cardSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Task title is too Short")
    .max(20, "Task title is too long")
    .required("Task title is required"),
  content: Yup.string().min(3, "Too Short").max(300, "Too long").required(),
  deadline: Yup.date().min(new Date(Date.now() - DAY)),
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
      <h2 className={css.modalTitle}>Edit card</h2>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.close} width="18" height="18">
          <use href="/sprite.svg#x"></use>
        </svg>
      </button>
      <Formik
        initialValues={{
          title: editingCard.title,
          content: editingCard.content || "",
          deadline: new Date(editingCard.deadline),
          priority: editingCard.priority,
        }}
        validationSchema={cardSchema}
        onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Field
              className={css.modalInputTitle}
              name="title"
              id={cardId}
              placeholder="Title"
            />
            <div className={css.errorWrapper}>
              <ErrorMessage
                className={css.error}
                name="title"
                component="span"
              />
            </div>

            <Field
              className={css.textarea}
              as="textarea"
              cols="30"
              rows="10"
              name="content"
              id={cardId}
              placeholder="Description"
            />

            <div className={css.errorWrapper}>
              <ErrorMessage
                className={css.error}
                name="content"
                component="span"
              />
            </div>

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
                    style={{
                      backgroundColor: "var(--medium-priority)",
                    }}
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
                    style={{ backgroundColor: "var(--high-priority)" }}
                  ></span>
                </label>
              </div>
            </div>

            <div>
              <h3 className={css.modalSubtitle}>Deadline</h3>
              <DatePicker
                selected={values.deadline}
                onChange={(date) => setFieldValue("deadline", date)}
                className={css.datepicker}
                dateFormat="MMMM, d"
                minDate={new Date()}
                popperClassName="myCustomDatepickerPopper"
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

// EditCardModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   cardId: PropTypes.string.isRequired,
//   editingCard: PropTypes.shape({
//     id: PropTypes.string,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     priority: PropTypes.oneOf(Object.values(PRIORITIES)),
//     calendar: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.instanceOf(Date),
//     ]),
//   }),
// };
