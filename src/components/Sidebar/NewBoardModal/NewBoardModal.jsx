import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import css from './NewBoardModal.module.css';
Modal.setAppElement('#root');
import noBackground from '../../../img/no-background.png';
import pinkFlowers from '../../../img/pinkFlowers.png';
import nightSky from '../../../img/nightSky.png';
import three from '../../../img/three.png';
import halfMoon from '../../../img/halfMoon.png';
import palmLeaves from '../../../img/palmLeaves.png';
import cloudySky from '../../../img/cloudySky.png';
import rockyCoast from '../../../img/rockyCoast.png';
import violetCircle from '../../../img/violetCircle.png';
import fullMoon from '../../../img/fullMoon.png';
import yacht from '../../../img/yacht.png';
import balloon from '../../../img/balloon.png';
import canyon from '../../../img/canyon.png';
import boat from '../../../img/boat.png';
import balloons from '../../../img/balloons.png';
import trailer from '../../../img/trailer.png';

const icons = [
  'project',
  'star',
  'loading',
  'puzzle',
  'container',
  'lightning',
  'colors',
  'hexagon',
];
const backgrounds = [
  { name: 'no-background', imageUrl: noBackground },
  { name: 'pinkFlowers', imageUrl: pinkFlowers },
  { name: 'nightSky', imageUrl: nightSky },
  { name: 'three', imageUrl: three },
  { name: 'halfMoon', imageUrl: halfMoon },
  { name: 'palmLeaves', imageUrl: palmLeaves },
  { name: 'cloudySky', imageUrl: cloudySky },
  { name: 'rockyCoast', imageUrl: rockyCoast },
  { name: 'violetCircle', imageUrl: violetCircle },
  { name: 'fullMoon', imageUrl: fullMoon },
  { name: 'yacht', imageUrl: yacht },
  { name: 'balloon', imageUrl: balloon },
  { name: 'canyon', imageUrl: canyon },
  { name: 'boat', imageUrl: boat },
  { name: 'balloons', imageUrl: balloons },
  { name: 'trailer', imageUrl: trailer },
];

const NewBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  const initialValues = {
    title: '',
    icon: icons[0],
    background: backgrounds[0].name,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Please enter a title.')
      .min(3, 'Title must be at least 3 characters long.')
      .max(20, 'Title must not exceed 20 characters.'),
    icon: Yup.string().required('Please select an icon.'),
    background: Yup.string().required('Please select a background.'),
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel='New Board Modal'
      ariaHideApp={false}>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.closeButtonIcon}>
          <use href="/sprite.svg#x"></use>
        </svg>
      </button>
      <h3 className={css.modalName}>New board</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onCreateBoard(values);
          resetForm();
          onClose();
        }}>
        {({ setFieldValue, values }) => (
          <Form>
            <Field
              type='text'
              name='title'
              placeholder='Title'
              className={css.input}
            />
            <ErrorMessage name='title' component='p' className={css.error} />

            <div className={css.iconsSection}>
              <p className={css.sectionName}>Icons</p>

              <div className={css.iconOptions}>
                {icons.map((icon, index) => (
                  <label key={index} className={css.iconLabel}>
                    <Field
                      type='radio'
                      name='icon'
                      value={icon}
                      onChange={() => setFieldValue('icon', icon)}
                      className={css.hiddenInput}
                    />
                    <svg
                      className={`${css.iconOption} ${
                        icon === values.icon ? css.selected : ''
                      }`}>
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
                      type='radio'
                      name='background'
                      value={bg.name}
                      onChange={() => setFieldValue('background', bg.name)}
                      className={css.hiddenInput}
                    />
                    <div
                      className={`${css.backgroundOption} ${
                        bg.name === values.background ? css.selected : ''
                      }`}
                      style={{ backgroundImage: `url(${bg.imageUrl})` }}></div>
                  </label>
                ))}
              </div>
            </div>
            <button type='submit' className={css.createButton}>
              <span className={css.modalPlus}>
              <svg className={css.modalPlusSvg} width="14" height="14">
                  <use href="/sprite.svg#icon-plus" />
                </svg>
              </span>
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
