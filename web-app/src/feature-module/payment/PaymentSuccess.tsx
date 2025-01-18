import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';    
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

const PaymentSuccess=()=>  {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [TransactionID, setTransactionID] = useState("");

  useEffect(() => {
      const paymentStatus = searchParams.get("status");
      const paymentTransactionID = searchParams.get("TransactionID");
      setStatus(paymentStatus??"");
      setTransactionID(paymentTransactionID??"")
  }, [searchParams]);

  return (
      <div>
          <h1>Payment Result</h1>
          {status === "success" ? (
              <p>Your payment was successful!</p>
          ) : (
              <p>Payment failed or was canceled.</p>
          )}
      </div>
  );
};

export default PaymentSuccess;
