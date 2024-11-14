import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../ScreensPage/ScreensPage.jsx';
import styles from './HomePage.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import { clearBackgroundUrls } from '../../redux/boards/slice.js';
import { selectError } from '../../redux/auth/selectors.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import BeforeStart from '../../components/BeforeStart/BeforeStart.jsx';
import {
  fetchBackground,
  fetchLastActiveBoard,
} from '../../redux/boards/operations.js';
import {
  selectBackground,
  selectBackgroundUrls,
  selectIsLoading,
} from '../../redux/boards/selectors.js';

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { boardName } = useParams();

  const backgroundUrls = useSelector(selectBackgroundUrls);
  const error = useSelector(selectError);

  const resetBackgroundsVars = () => {
    document.documentElement.style.setProperty('--desktop-bg', 'none');
    document.documentElement.style.setProperty('--tablet-bg', 'none');
    document.documentElement.style.setProperty('--mobile-bg', 'none');
  };

  const setBackgroundVars = backgroundUrls => {
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
    if (backgroundUrls.length) {
      setBackgroundVars(backgroundUrls);
    } else {
      resetBackgroundsVars();
    }
  }, [backgroundUrls]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <Sidebar className={styles.sidebar} />
      <div className={styles.dashboardContainer}>
        {boardName ? isLoading ? <Loader /> : <ScreensPage /> : <BeforeStart />}
      </div>
    </>
  );
}
