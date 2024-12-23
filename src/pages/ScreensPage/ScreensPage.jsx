import { useParams } from 'react-router';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard.jsx';

export default function ScreensPage() {
  const { boardName } = useParams();

  return (
    <>
      <HeaderDashboard boardName={boardName} />
      <MainDashboard />
    </>
  );
}
