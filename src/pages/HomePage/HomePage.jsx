import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage.jsx";
import styles from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect, useState } from "react";
import {
  fetchBackground,
  fetchLastActiveBoard,
} from "../../redux/boards/operations.js";
import { useParams } from "react-router";
import BeforeStart from "../../components/BeforeStart/BeforeStart.jsx";
import {
  selectActiveBoardId,
  selectBackground,
  selectBackgroundUrls,
} from "../../redux/boards/selectors.js";
import { clearBackgroundUrls } from "../../redux/boards/slice.js";
import { selectError } from "../../redux/auth/selectors.js";

export default function HomePage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { boardName } = useParams();

  const fetchActiveBoard = async (boardId) => {
    setIsLoading(true);

    await dispatch(fetchLastActiveBoard(boardId))
      .unwrap()
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);
  };

  const backgroundUrls = useSelector(selectBackgroundUrls);
  const background = useSelector(selectBackground);
  const boardId = useSelector(selectActiveBoardId);
  const error = useSelector(selectError);

  useEffect(() => {
    if (boardName) {
      if (background === "no-background") {
        dispatch(clearBackgroundUrls());
        document.documentElement.style.setProperty("--desktop-bg", "none");
        document.documentElement.style.setProperty("--tablet-bg", "none");
        document.documentElement.style.setProperty("--mobile-bg", "none");
      } else {
        dispatch(clearBackgroundUrls());
        dispatch(fetchBackground(background));
      }
    }
  }, [dispatch, boardName, background]);

  console.log("MainDashboard rendered", { boardId, isLoading, error });

  useEffect(() => {
    if (backgroundUrls && backgroundUrls.length) {
      document.documentElement.style.setProperty(
        "--desktop-bg",
        `url(${backgroundUrls[2]})`
      );
      document.documentElement.style.setProperty(
        "--tablet-bg",
        `url(${backgroundUrls[1]})`
      );
      document.documentElement.style.setProperty(
        "--mobile-bg",
        `url(${backgroundUrls[0]})`
      );
    }
  }, [backgroundUrls]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      <Header fetchActiveBoard={fetchActiveBoard} />
      <Sidebar className={styles.sidebar} fetchActiveBoard={fetchActiveBoard} />
      <div className={styles.dashboardContainer}>
        {boardName ? isLoading ? <Loader /> : <ScreensPage /> : <BeforeStart />}
      </div>
    </>
  );
}
