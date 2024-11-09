import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import RestrictedRoute from "./routes/RestrictedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import NotFoundPage from "../pages/NotFound/NotFoundPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations.js";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader.jsx";
import { selectIsRefreshing, selectToken } from "../redux/auth/selectors.js";
const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
// const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
import AuthPage from "../pages/AuthPage/AuthPage.jsx";
import { clearBoards, setBoards } from "../redux/boards/slice.js";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const ScreensPage = lazy(() => import("../pages/ScreensPage/ScreensPage"));

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const response = await dispatch(refreshUser()).unwrap();
        if (response?.boardsData) {
          dispatch(clearBoards);
          dispatch(setBoards(response.boardsData));
        }
      }
    };

    fetchUserData();
  }, [dispatch, token]);

  return (
    <>
      <Toaster />
      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route
              path="welcome"
              element={
                <PublicRoute>
                  <WelcomePage />
                </PublicRoute>
              }
            />
            <Route
              path="auth/:id"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <RestrictedRoute>
                  <HomePage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/home/:boardName"
              element={
                <RestrictedRoute>
                  <ScreensPage />
                </RestrictedRoute>
              }
            />
            {/* <Route
            path="/screen"
            element={
              <RestrictedRoute>
                <ScreensPage />
              </RestrictedRoute>
            }
          /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
