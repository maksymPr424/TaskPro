import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import PropTypes from "prop-types";
import css from "./NewBoardModal.module.css";

Modal.setAppElement("#root");

const icons = ["icon1", "icon2", "icon3", "icon4", "icon5", "icon6", "icon7", "icon8"];
const backgrounds = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9", "bg10", "bg11", "bg12", "bg13", "bg14", "bg15", "bg16"];

const NewBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  const initialValues = {
    title: "",
    icon: icons[0],
    background: backgrounds[0],
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Please enter a title.")
      .min(3, "Title must be at least 3 characters long.")
      .max(20, "Title must not exceed 20 characters."),
    icon: Yup.string().required("Please select an icon."),
    background: Yup.string().required("Please select a background."),
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="New Board Modal"
      ariaHideApp={false}
    >
      <button className={css.closeButton} onClick={onClose}>×</button>
      <h2 className={css.modalName}>New board</h2>
      {/*------------------------------------------------------  */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onCreateBoard(values);
          resetForm(); 
          onClose();
        }}

      >
        {({ setFieldValue, values }) => (
          <Form>
            <Field
              type="text"
              name="title"
              placeholder="Title"
              className={css.input}
            />
            <ErrorMessage name="title" component="p" className={css.error} />

            <div className={css.iconsSection}>
              {/* ------------------------------------- */}
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

            <button type="submit" className={css.createButton}>
              {/* <svg className={css.createIcon}>
                <use href="/src/assets/plus.svg#plus"></use>
              </svg> */}
              + 
              Create
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

NewBoardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardModal;
