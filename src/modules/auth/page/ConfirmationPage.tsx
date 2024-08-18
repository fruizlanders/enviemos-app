// ConfirmationPage.jsx
import {useLocation, useNavigate} from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const confirmationUrl = queryParams.get('confirmation_url');

  const handleConfirm = async () => {
    if (confirmationUrl) {
      const response = await fetch(confirmationUrl);
      if (response.ok) {
        // Redirect to a success page or display a success message
        navigate('/success');
      } else {
        // Handle error
        console.error('Error confirming signup');
      }
    }
  };

  return (
    <div>
      <h1>Confirm Your Signup</h1>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default ConfirmationPage;
