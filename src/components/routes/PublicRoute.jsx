/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to='/home' />;
  }
  return children;
}
