import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalWindow from '../Modal/Modal.jsx';
import { selectLastActiveBoard } from '../../redux/boards/selectors';
import {
  selectIsLoggedIn,
  selectRefreshError,
} from '../../redux/auth/selectors';
export default function RestrictedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const refreshError = useSelector(selectRefreshError);
  const lastActiveBoard = useSelector(selectLastActiveBoard);
  const [isModalOpen, setModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshError) {
      setModalOpen(true);
    }

    if (isLoggedIn) {
      const targetPath = lastActiveBoard?.title
        ? `/home/${lastActiveBoard.title}`
        : '/home';
      navigate(targetPath, { replace: true });
    } else if (!isLoggedIn && !refreshError) {
      setShouldRedirect(true);
    }
  }, [refreshError, isLoggedIn, lastActiveBoard, navigate]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setShouldRedirect(true);
  };

  if (!isLoggedIn && shouldRedirect) {
    return <Navigate to='/welcome' />;
  }

  return (
    <>
      {isModalOpen && (
        <ModalWindow isOpen={isModalOpen} onClose={handleCloseModal}>
          {refreshError}
        </ModalWindow>
      )}
      {isLoggedIn ? children : null}
    </>
  );
}
