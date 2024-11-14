import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NeedHelpModal.module.css';
import { taskpro_api } from '../../../config/taskpro_api';

const NeedHelpModal = ({ isOpen, onClose }) => {
  const [submitError, setSubmitError] = useState('');

  const initialValues = {
    email: '',
    comment: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter an email address.'),
    comment: Yup.string()
      .min(10, 'Comment must be at least 10 characters.')
      .max(500, 'Comment must not exceed 500 characters.')
      .required('Please enter a comment.'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await taskpro_api.post('/support', {
        userEmail: values.email,
        comment: values.comment,
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Failed to send support request.', error);
      setSubmitError('Failed to send support request.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel='Need Help Modal'
      ariaHideApp={false}>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.closeButtonIcon}>
          <use href='/sprite.svg#x'></use>
        </svg>
      </button>
      <h2 className={css.modalName}>Need help</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Field
              type='email'
              name='email'
              placeholder='Email address'
              className={css.input}
            />
            <div className={css.errorWrapper}>
              <ErrorMessage name='email' component='p' className={css.error} />
            </div>
            <Field
              as='textarea'
              name='comment'
              placeholder='Comment'
              className={css.textarea}
            />
            <div className={css.errorWrapper}>
              <ErrorMessage
                name='comment'
                component='p'
                className={css.error}
              />
            </div>
            {submitError && <p className={css.error}>{submitError}</p>}
            <button
              type='submit'
              className={css.sendButton}
              aria-label='Send help request'>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

NeedHelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NeedHelpModal;
