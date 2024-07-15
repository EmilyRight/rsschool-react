import { useNavigate } from 'react-router';
import './error-page.scss';
function ErrorPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
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
