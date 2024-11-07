import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import RestrictedRoute from "./routes/RestrictedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import NotFoundPage from "../pages/NotFound/NotFoundPage.jsx";
import { useDispatch } from "react-redux";
import { refreshUser } from "../redux/auth/operations.js";
const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const ScreensPage = lazy(() => import("../pages/ScreensPage/ScreensPage"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
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
    </>
  );
}

export default App;
