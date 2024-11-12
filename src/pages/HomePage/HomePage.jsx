import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../ScreensPage/ScreensPage.jsx';
import styles from './HomePage.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import { useEffect, useState } from 'react';
import {
  fetchBackground,
  fetchLastActiveBoard,
} from '../../redux/boards/operations.js';
import { useParams } from 'react-router';
import BeforeStart from '../../components/BeforeStart/BeforeStart.jsx';
import {
  selectBackground,
  selectBackgroundUrls,
} from '../../redux/boards/selectors.js';
import { clearBackgroundUrls } from '../../redux/boards/slice.js';
import { selectError } from '../../redux/auth/selectors.js';

export default function HomePage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { boardName } = useParams();
  const fetchActiveBoard = async (boardId) => {
    setIsLoading(true);
    await dispatch(fetchLastActiveBoard(boardId))
      .unwrap()
      .catch((err) => {
        console.error(err);
      });

    setIsLoading(false);
  };

  const backgroundUrls = useSelector(selectBackgroundUrls);
  const backgroundName = useSelector(selectBackground);
  const error = useSelector(selectError);

  const resetBackgroundsVars = () => {
    document.documentElement.style.setProperty('--desktop-bg', 'none');
    document.documentElement.style.setProperty('--tablet-bg', 'none');
    document.documentElement.style.setProperty('--mobile-bg', 'none');
  };

  const setBackgroundVars = (backgroundUrls) => {
    document.documentElement.style.setProperty(
      '--desktop-bg',
      `url(${backgroundUrls[2]})`
    );
    document.documentElement.style.setProperty(
      '--tablet-bg',
      `url(${backgroundUrls[1]})`
    );
    document.documentElement.style.setProperty(
      '--mobile-bg',
      `url(${backgroundUrls[0]})`
    );
  };

  useEffect(() => {
    if (boardName) {
      if (!backgroundName) {
        return;
      } else {
        if (backgroundName === 'no-background') {
          console.log('backgroundName: no ', backgroundName);
          resetBackgroundsVars();
        } else {
          console.log('backgroundName: else ', backgroundName);
          dispatch(clearBackgroundUrls());
          dispatch(fetchBackground(backgroundName));
        }
      }
    }
  }, [dispatch, boardName, backgroundName]);

  useEffect(() => {
    if (backgroundUrls && backgroundUrls.length) {
      setBackgroundVars(backgroundUrls);
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
