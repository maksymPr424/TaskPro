import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage.jsx";
import styles from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import { useState } from "react";
import { fetchLastActiveBoard } from "../../redux/boards/operations.js";
import { useParams } from "react-router";
import BeforeStart from "../../components/BeforeStart/BeforeStart.jsx";

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
