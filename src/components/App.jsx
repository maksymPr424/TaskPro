import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const ScreensPage = lazy(() => import("../pages/ScreensPage/ScreensPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/screen" element={<ScreensPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
