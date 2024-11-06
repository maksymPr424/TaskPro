import * as Yup from "yup";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import css from "../Card.module.css";
import PropTypes from "prop-types";

const PRIORITIES = {
  WITHOUT: "Without priority",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const cardSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too Short").max(20, "Too long"),
  description: Yup.string().min(3, "Too Short").max(100, "Too long"),
  calendar: Yup.date().min(new Date()),
  priority: Yup.string().oneOf(Object.values(PRIORITIES)),
});

const IconPlus = (id) => (
  <svg>
    <use xlinkHref={`../../../../assets/sprite.svg#${id}`} />
  </svg>
);

const IconClose = (id) => (
  <svg>
    <use xlinkHref={`../../../../assets/sprite.svg#${id}`} />
  </svg>
);

export const EditCardModal = ({
  isOpen,
  onClose,
  onSubmit,
  cardId,
  editingCard,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal className={css.addModal} isOpen={isOpen} onRequestClose={onClose}>
        <h2 className={css.modalTitle}>Add card</h2>
        <button className={css.closeButton} onClick={onClose}>
          <IconClose className={css.close} id="icon-close" />
        </button>
        <Formik
          initialValues={{
            title: editingCard?.title || "",
            description: editingCard?.description || "",
            calendar: editingCard?.calendar || new Date(),
            labelPriority: editingCard?.labelPriority || PRIORITIES.WITHOUT,
          }}
          validationSchema={cardSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field className={css.modalInputTitle} name="title" id={cardId} />
              <ErrorMessage
                className={css.error}
                name="title"
                component="span"
              />

              <Field
                className={css.modalInputTitle}
                type="textarea"
                name="description"
                id={cardId}
              />
              <ErrorMessage
                className={css.error}
                name="description"
                component="span"
              />

              <div className={css.priority}>
                <h3 className={css.modalSubtitle}>Label color</h3>
                <Field
                  type="radio"
                  name="labelPriority"
                  value="Without priority"
                />
                <Field type="radio" name="labelPriority" value="Low" />
                <Field type="radio" name="labelPriority" value="Medium" />
                <Field type="radio" name="labelPriority" value="High" />
              </div>

              <div>
                <h3 className={css.modalSubtitle}>Deadline</h3>
                <DatePicker defaultValue={new Date()} />
              </div>

              <button
                className={css.modalButton}
                type="submit"
                disabled={isSubmitting}
              >
                <IconPlus className={css.plus} id="icon-plus" />
                {isSubmitting ? "Adding..." : "Add"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </LocalizationProvider>
  );
};

EditCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
  editingCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    labelPriority: PropTypes.oneOf(Object.values(PRIORITIES)).isRequired,
    calendar: PropTypes.instanceOf(Date).isRequired,
  }),
};
