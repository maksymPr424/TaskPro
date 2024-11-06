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
  title: Yup.string()
    .min(3, "Too Short")
    .max(20, "Too long")
    .required("Required"),
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

export const AddCardModal = ({ isOpen, onClose, onSubmit, cardId }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal className={css.addModal} isOpen={isOpen} onRequestClose={onClose}>
        <h2 className={css.modalTitle}>Add card</h2>
        <button className={css.closeButton}>
          <IconClose className={css.close} id="icon-close" />
        </button>
        <Formik
          initialValues={{
            title: "",
            description: "",
            calendar: new Date(),
            labelPriority: "Without priority",
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

AddCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
};
