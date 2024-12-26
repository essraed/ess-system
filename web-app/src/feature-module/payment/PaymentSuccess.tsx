import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';    
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

const PaymentSuccess: React.FC = observer(() => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('Processing your payment...');
  const navigate = useNavigate();
  const location = useLocation();
  const {paymentStore,bookingStore} = useStore();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('status');
    const orderId = queryParams.get('orderId');

    if (paymentStatus === 'SUCCESS' && orderId) {
      bookingStore.setStatusInProcess(orderId ?? "");
      paymentStore.handlePaymentCallback(orderId,paymentStatus)
        .then((response) => {
          if (response.status === 'success') {
            setMessage('Your payment was successful. Thank you for your purchase!');
          } else {
            setMessage('There was an issue processing your payment.');
          }
          setLoading(false);
        })
        .catch(() => {
          setMessage('An error occurred while processing your payment.');
          setLoading(false);
        });
    } else {
      setMessage('Invalid payment status or order ID.');
      setLoading(false);
    }
  }, [location, paymentStore]);

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="payment-success">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{message}</h1>
          <button onClick={redirectToHome}>Return to Home</button>
        </>
      )}
    </div>
  );
});

export default PaymentSuccess;
