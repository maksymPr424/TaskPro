import PropTypes from "prop-types";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./EditBoardModal.module.css";

const icons = ["project", "star", "loading", "puzzle", "container", "lightning", "colors", "hexagon"];
const backgrounds = [
  { name: "no-background", imageUrl: "/src/img/no-background.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/pinkFlowers.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/nightSky.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/three.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/halfMoon.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/palmLeaves.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/cloudySky.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/rockyCoast.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/violetCircle.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/fullMoon.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/yacht.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/balloon.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/canyon.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/boat.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/balloons.png" },
  { name: "pinkFlowers", imageUrl: "/src/img/trailer.png" },
];

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
            _id: boardData._id,
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
            <button type="submit" className={css.saveButton}>
              <span className={css.modalPlus}>+</span>
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
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    background: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
};

export default EditBoardModal;
