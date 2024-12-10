import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

class PaymentStore {
  payments = [];
  currentPayment = null;
  paymentUrl = null;
  status = "";
  error = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Initiate Payment
  initiatePayment = async (paymentData:FormData) => {
    this.loading = true;
    try {
      const response = await agent.Payment.initiate(paymentData);
      return { status: "success", data: response };
    } catch (error:any) {
      runInAction(() => {
        this.error = error.message || "Failed to initiate payment";
        this.paymentUrl = null;
        this.status = "Failed";
      });
      return { status: "error", error: this.error };
    } finally {
      this.loading = false;
    }
  };

  // Handle Payment Callback
  handlePaymentCallback = async (orderId:string, paymentStatus:string) => {
    this.loading = true;

    const formData = new FormData();

    formData.append("orderId",orderId);
    formData.append("paymentStatus",paymentStatus);
    try {
      await agent.Payment.callback(formData);
      runInAction(() => {
        if (paymentStatus === "SUCCESS") {
          this.status = "Completed";
        } else {
          this.status = "Failed";
        }
        this.error = null;
      });
      return { status: "success", data: "Payment processed successfully" };
    } catch (error:any) {
      runInAction(() => {
        this.error = error.message || "Failed to handle payment callback";
        this.status = "Failed";
      });
      return { status: "error", error: this.error };
    } finally {
      this.loading = false;
    }
  };

//   // Load Payment by ID
//   getPaymentById = async (id) => {
//     this.loading = true;
//     try {
//       const payment = await agent.Payment.getById(id);
//       runInAction(() => {
//         this.currentPayment = {
//           ...payment,
//           createDate: formatDateTime(payment.createDate),
//         };
//         this.error = null;
//       });
//     } catch (error:any) {
//       runInAction(() => {
//         this.error = error.message || "Failed to load payment details";
//       });
//     } finally {
//       this.loading = false;
//     }
//   };

  // Clear Payment State
  clearPayment = () => {
    this.paymentUrl = null;
    this.status = "";
    this.error = null;
    this.loading = false;
  };
}

export default PaymentStore;
