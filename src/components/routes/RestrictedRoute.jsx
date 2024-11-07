import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalWindow from "../Modal/Modal.jsx";
import {
  selectIsLoggedIn,
  selectRefreshError,
} from "../../redux/auth/selectors";

export default function RestrictedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const refreshError = useSelector(selectRefreshError);
  const [isModalOpen, setModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (refreshError) {
      setModalOpen(true);
    }
  }, [refreshError]);

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
