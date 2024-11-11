import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import PropTypes from "prop-types";
import css from "./NewBoardModal.module.css";

Modal.setAppElement("#root");

const icons = ["project", "star", "loading", "puzzle", "container", "lightning", "colors", "hexagon"];
const backgrounds = [
  { name: "no-background", imageUrl: "/src/img/no-background.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/pinkFlowers.png" },
  { name: "nightSky", imageUrl: "/src/img/nightSky.png" },
  { name: "three", imageUrl: "/src/img/three.png" },
  { name: "halfMoon", imageUrl: "/src/img/halfMoon.png" },
  { name: "palmLeaves", imageUrl: "/src/img/palmLeaves.png" },
  { name: "cloudySky", imageUrl: "/src/img/cloudySky.png" },
  { name: "rockyCoast", imageUrl: "/src/img/rockyCoast.png" },
  { name: "violetCircle", imageUrl: "/src/img/violetCircle.png" },
  { name: "fullMoon", imageUrl: "/src/img/fullMoon.png" },
  { name: "yacht", imageUrl: "/src/img/yacht.png" },
  { name: "balloon", imageUrl: "/src/img/balloon.png" },
  { name: "canyon", imageUrl: "/src/img/canyon.png" },
  { name: "boat", imageUrl: "/src/img/boat.png" },
  { name: "balloons", imageUrl: "/src/img/balloons.png" },
  { name: "trailer", imageUrl: "/src/img/trailer.png" },
];

const NewBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  const initialValues = {
    title: "",
    icon: icons[0],
    background: backgrounds[0].name,
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
      ariaHideApp={false}>
      <button className={css.closeButton} onClick={onClose}>×</button>
      <h3 className={css.modalName}>New board</h3>

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
                    <svg
                      className={`${css.iconOption} ${icon === values.icon ? css.selected : ""}`}
                    >
                      <use href={`/boards.svg#${icon}`}></use>
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
                      value={bg.name}
                      onChange={() => setFieldValue("background", bg.name)}
                      className={css.hiddenInput}
                    />
                    <div
                      className={`${css.backgroundOption} ${bg.name === values.background ? css.selected : ""}`}
                      style={{ backgroundImage: `url(${bg.imageUrl})` }}
                    ></div>

                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className={css.createButton}>
              <span className={css.modalPlus}>+</span>
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