import PropTypes from "prop-types";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./EditBoardModal.module.css";

const icons = ["icon1", "icon2", "icon3", "icon4", "icon5", "icon6", "icon7", "icon8"];
const backgrounds = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9", "bg10", "bg11", "bg12", "bg13", "bg14", "bg15", "bg16"];


const EditBoardModal = ({ isOpen, boardData, onClose, onSaveChanges }) => {
  const initialValues = {
    title: boardData.title || "",
    icon: boardData.icon || icons[0],
    background: boardData.background || backgrounds[0],
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Please enter a title.")
      .min(3, "Title must be at least 3 characters long.")
      .max(20, "Title must not exceed 20 characters."),
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="Edit Board Modal"
      ariaHideApp={false}
    >
      <button className={css.closeButton} onClick={onClose}>×</button>
      <h2 className={css.modalName}>Edit Board</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSaveChanges({
            id: boardData.id,
            title: values.title,
            icon: values.icon,
            background: values.background,
          });
          onClose();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Field
              type="text"
              name="title"
              placeholder="Title (3-20 characters)"
              className={css.input}
            />
            <ErrorMessage name="title" component="p" className={css.error} />

            <div className={css.iconsSection}>
              <p className={css.sectionName}>Icons</p>
              <div className={css.iconOptions}>
                {icons.map((icon, index) => (
                  <label key={index} className={css.iconLabel}>
                    <Field
                      type="radio"
                      name="icon"
                      value={icon}
                      onChange={() => setFieldValue("icon", icon)}
                      className={css.hiddenInput}
                    />
                    <svg className={`${css.iconOption} ${icon === values.icon ? css.selected : ""}`}>
                      <use href={`/src/assets/${icon}.svg#${icon}`}></use>
                    </svg>
                  </label>
                ))}
              </div>
            </div>

            <div className={css.backgroundSection}>
              <p className={css.sectionName}>Background</p>
              <div className={css.backgroundOptions}>
                {backgrounds.map((bg, index) => (
                  <label key={index} className={css.backgroundLabel}>
                    <Field
                      type="radio"
                      name="background"
                      value={bg}
                      onChange={() => setFieldValue("background", bg)}
                      className={css.hiddenInput}
                    />
                    <div
                      className={`${css.backgroundOption} ${bg === values.background ? css.selected : ""}`}
                      style={{ backgroundImage: `url(/src/assets/${bg}.jpg)` }}
                    ></div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className={css.saveButton}>
              {/* <svg className={css.saveIcon}>
                <use href="/src/assets/edit.svg#edit"></use>
              </svg> */}
              + 
              Save
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

EditBoardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  boardData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    background: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
};

export default EditBoardModal;
