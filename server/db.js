const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase_adminsdk-nodejs.json')

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://shoplify-59ca9.firebaseio.com'
})

const db = admin.firestore(); //Initialize Firestore database

//Save Payment Details to Firestore
async function savePaymentData(transactionId, data){
    try {
        await db.collection('payments').doc(transactionId).set(data);
        // console.log("Payment data saved successfully");
        
    } catch (error) {
        console.error("Error saving payment data:", error);
        throw error;
    }
}

async function saveOrderDetails(orderId, data){
    try {
        await db.collection('orders').doc(orderId).set(data);
        // console.log("Order data saved successfully");
        
    } catch (error) {
        console.error("Error saving order data:", error);
        throw error;
    }
}

// Delete Cart Document after successful payment
async function deleteCartDocument(collectionName, docId){
    try {
        //Deleting the cart document
        await db.collection(collectionName).doc(docId).delete();  
        
    } catch (error) {
        console.error("Error deleting cart document:", error);
    }
}

module.exports = {savePaymentData, saveOrderDetails, deleteCartDocument}