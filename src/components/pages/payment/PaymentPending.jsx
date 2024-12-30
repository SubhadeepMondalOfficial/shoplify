import Lottie from "lottie-react";
import tickAnimation from "../../../../public/Images/animations/tick_animation.json";
import crossAnimation from "../../../../public/Images/animations/cross_animation.json";
import exclamationMarkAnimation from "../../../../public/Images/animations/exclamationMark_animation.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import firebaseAppConfig from "../../../config/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseAppConfig);

const PaymentPending = () => {
  const [merchantTransactionId, setMerchantTransactionId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);

  //!================= Today's Date, DayName and Current Time =================
  // const date = new Date();
  // const day = date.getDate();
  // const month = date.toLocaleString("default", { month: "short" });
  // const year = date.getFullYear();
  // const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  // const dayName = days[date.getDay()];
  // const currentTime = new Date().toLocaleTimeString();

  useEffect(() => {
    setMerchantTransactionId(window.location.search.split("=")[1]);

    // Fetch Payment Details from Firestore
    const fetchPaymentDetails = async () => {
      try {
        const docRef = doc(db, "payments", merchantTransactionId);
        const paymentDoc = await getDoc(docRef);
        // let pdetails = {...paymentDoc.data(), code: 'PAYMENT_PENDING'}
        setPaymentDetails(paymentDoc.data());
        console.log("Payment Details:", paymentDetails);
        
      } catch (error) {
        console.log("Error fetching payment details:", error);
      }
    }
    fetchPaymentDetails();

  }, [merchantTransactionId]);

  return paymentDetails ? (
    <div className="bg-[#f8f8f8] min-h-screen">
      <div className="mx-auto w-1/2 pt-6">
        <main className="flex flex-col items-center">
          {/* Display payment icon and status according to payment code */}
          {paymentDetails.code === "PAYMENT_SUCCESS" ? (
            <>
              <Lottie
                animationData={tickAnimation}
                loop={true}
                style={{ width: "28%", height: "28%" }}
              />
              <h1 className="text-2xl font-bold">Payment Successful</h1>
            </>
          ) : paymentDetails.code === "PAYMENT_PENDING" ? (
            <>
              <Lottie
                animationData={exclamationMarkAnimation}
                loop={true}
                style={{ width: "25%", height: "25%" }}
              />
              <h1 className="text-2xl font-bold">Payment is Pending</h1>
            </>
          ) : (
            <>
              <Lottie
                animationData={crossAnimation}
                loop={true}
                style={{ width: "14%", height: "14%" }}
              />
              <h1 className="text-2xl font-bold mt-7">Payment Failed !</h1>
            </>
          )}
          <p className="text-gray-400 text-sm mt-3">
            The ordered confirmation has been send to {paymentDetails.email}
          </p>
          <hr className="h-[2px] bg-slate-400 w-3/4 my-5" />
          <div className="grid grid-cols-2 gap-x-32 gap-y-3">
            <span className="text-gray-500 font-semibold">
              Transaction Date
            </span>
            <span>{paymentDetails.data.date}</span>
            <span className="text-gray-500 font-semibold">
              Transaction Time
            </span>
            <span>{paymentDetails.data.time}</span>
            <span className="text-gray-500 font-semibold">Payment Method</span>
            <span>Visa | {paymentDetails.data.paymentInstrument.cardType}</span>
            <span className="text-gray-500 font-semibold">Transation Id</span>
            <span>{merchantTransactionId}</span>
            <span className="text-gray-500 font-semibold">Order Id</span>
            <span>{paymentDetails.data.orderId}</span>
            <span className="text-gray-500 font-semibold">Total Amount</span>
            <span>{paymentDetails.data.amount}/-</span>
          </div>

          <div>
            <Link
              to={"/"}
              className="bg-[#FD5C36] font-semibold text-white mt-16 px-4 py-2 rounded block"
            >
              Go To Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
}

export default PaymentPending;