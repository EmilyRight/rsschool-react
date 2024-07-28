import { useNavigate } from 'react-router';
import './error-page.scss';
import { MAIN_PAGE_PATH } from '../../constants/constants';

function ErrorPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(`${MAIN_PAGE_PATH}`);
  };

  return (
    <div className="error">
      <div className="error__text">Error. No page on this path</div>
      <div className="error__btn" onClick={handleBack}>
        Back to search
      </div>
    </div>
  );
}

export default ErrorPage;
