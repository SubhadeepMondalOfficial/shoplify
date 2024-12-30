// Import required modules
const express = require("express"); // Framework for creating the server and routes
const cors = require("cors"); // Enables cross-origin requests
const axios = require("axios"); // Simplifies making HTTP requests
const crypto = require("crypto"); // Provides cryptographic functions like hashing
const { savePaymentData, saveOrderDetails, deleteCartDocument } = require("./db");

// Initialize the express app
const app = express();

// Enable middleware
app.use(cors()); // Allow cross-origin requests for APIs
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Server configuration
const port = 8000; // Port number for the server
const salt_key = "96434309-7796-489d-8924-ab56988a6076"; // Provided by PhonePe, used for authentication
const merchant_id = "PGTESTPAYUAT86"; // PhonePe merchant ID for transactions

// Define a basic GET route
app.get("/", (req, res) => {
  res.send("Home Route working"); // Verifies if the server is running
});

let userId;
let cartDocId;
let cartItemsId;
let orderId;
let email;

// Route for initiating a payment
app.post("/payment", async (req, res) => {
  try {
    // Extracting transaction details from the request body
    let merchantTransactionId = req.body.transactionId; // Unique transaction ID sent from the frontend
    let { MID, name, amount, phone } = req.body; // Destructure the transaction details
    userId = req.body.userId;
    cartItemsId = req.body.cartItemsId;
    email = req.body.email;
    cartDocId = req.body.cartDocId;
    orderId = "OID" + Math.floor(Date.now() / Math.random()); // generate a random unique orderId

    // Prepare the data object as required by PhonePe API
    const data = {
      merchantId: merchant_id, // Merchant ID assigned by PhonePe
      merchantTransactionId: merchantTransactionId, // Unique transaction ID for this payment
      name: name, // Customer name sent from frontend
      amount: amount * 100, // Amount in paise (multiply by 100 to convert from rupees)
      redirectUrl: `http://localhost:${port}/payment/status?id=${merchantTransactionId}`, // URL to check payment status
      redirectMode: "POST", // Method used for redirection after payment
      mobileNumber: phone, // Customer's phone number
      paymentInstrument: {
        type: "PAY_PAGE", // Payment mode type
      },
    };

    // Convert the payment data to a Base64-encoded payload
    const payload = JSON.stringify(data); // Convert data to a JSON string
    const payloadMain = Buffer.from(payload).toString("base64"); // Encode the JSON string in Base64

    // Generate a secure X-VERIFY header
    const salt_index = 1; // Index used with the salt key
    const string = payloadMain + "/pg/v1/pay" + salt_key; // Concatenate payload, endpoint, and salt key
    const sha256 = crypto.createHash("sha256").update(string).digest("hex"); // Generate SHA-256 hash
    const X_VERIFY = sha256 + "###" + salt_index; // Append salt index to the hash

    //! const production_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"  ==> Production URL for Live Transactions
    // Define the PhonePe test endpoint and request options
    const test_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"; // Sandbox URL for testing
    const options = {
      method: "POST", // HTTP method
      url: test_URL, // PhonePe test API URL //! Change to production URL for live transactions
      headers: {
        accept: "application/json", // API expects JSON response
        "Content-Type": "application/json", // Request payload is in JSON
        "X-VERIFY": X_VERIFY, // Security header for authentication
      },
      data: {
        request: payloadMain, // Encoded payment details
      },
    };

    // Make the API call to PhonePe
    await axios(options)
      .then((response) => {
        // console.log("response from /payment", response.data); // Log the API response
        return res.json(response.data); // Send the API response back to the frontend
      })
      .catch((error) => {
        console.log(error); // Log errors
      });
  } catch (error) {
    console.log(`Error in /payment Route => ${error.message}`); // Handle unexpected errors
  }
});

// Route for checking payment status
app.post("/payment/status", (req, res) => {
  // Extracting the transaction ID from query parameters
  const merchantTransactionId = req.query.id; // Transaction ID sent in the redirect URL
  const merchantId = merchant_id; // Reuse the merchant ID constant

  // Generate X-VERIFY header for status check
  const salt_index = 1; // Use the same salt index as before
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key; // Concatenate endpoint and salt key
  const sha256 = crypto.createHash("sha256").update(string).digest("hex"); // Generate SHA-256 hash
  const X_VERIFY = sha256 + "###" + salt_index; // Append salt index to the hash

  // Define the request options for the status API
  const options = {
    method: "GET", // HTTP GET method
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`, // Status endpoint
    headers: {
      accept: "application/json", // API expects JSON response
      "Content-Type": "application/json", // Request payload is in JSON
      "X-VERIFY": X_VERIFY, // Security header for authentication
      "X-MERCHANT-ID": `${merchantId}`, // Merchant ID header
    },
  };

  // Make the API call to check payment status
  axios
    .request(options)
    .then(async function (response) {
      const { merchantTransactionId } = response.data.data;
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();

      response.data.data.date = currentDate;
      response.data.data.time = currentTime;
      response.data.data.orderId = orderId;
      response.data.email = email;
      response.data.data.amount = response.data.data.amount / 100; // Convert amount from paise to rupees - store the actual amount in the database
      const data = { ...response.data, userId };
      await savePaymentData(merchantTransactionId, data);

      // Save Order Details to Firestore
      const orderData = {
        userId,
        paymentId: merchantTransactionId,
        orderItems: cartItemsId,
        orderDate: currentDate,
        orderTime: currentTime,
      };

      if (
        response.data.success === true &&
        response.data.code === "PAYMENT_SUCCESS"
      ) {
        // Delete Cart Document after successful payment to empty the cart
        await deleteCartDocument('carts', cartDocId)
        await saveOrderDetails(orderId, orderData);
        // Redirect to success page if payment is successful
        const url = `http://localhost:5173/payment/success?merchantTransactionId=${merchantTransactionId}`;
        // console.log("responseDate from /status =>", response.data); // Log the response data
        return res.redirect(url);
      } else if (
        response.data.success === true &&
        response.data.code === "PAYMENT_PENDING"
      ) {
        await saveOrderDetails(orderId, orderData);
        const url = `http://localhost:5173/payment/pending?merchantTransactionId=${merchantTransactionId}`;
        return res.redirect(url);
      } else {
        await saveOrderDetails(orderId, orderData);
        // Redirect to failure page if payment fails
        const url = `http://localhost:5173/payment/failure?merchantTransactionId=${merchantTransactionId}`;
        return res.redirect(url);
      }
    })
    .catch(function (error) {
      console.log(`Error in /payment/status Route => ${error.message}`); // Log errors
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Confirmation message on startup
});
