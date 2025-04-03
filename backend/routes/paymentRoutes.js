const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const User = require("../models/User"); 
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const logger = require("../utils/logger");



const MERCHANT_KEY=process.env.PHONEPE_MERCHANT_KEY
const MERCHANT_ID=process.env.PHONEPE_MERCHANT_ID



const MERCHANT_BASE_URL=process.env.PHONEPE_MERCHANT_BASE_URL
const MERCHANT_STATUS_URL=process.env.PHONEPE_MERCHANT_STATUS_URL;

const redirectUrl="http://localhost:3000/payment/status"

const successUrl="http://localhost:5174/payment-success"
const failureUrl="http://localhost:5174/payment-failure"

let creditPut = 0;
let globalUserId = null;

router.post('/create-order', async (req, res) => {

    const {userId,  amount,credits} = req.body;
     logger.info("USer Details : ", userId, amount, credits);
    globalUserId = userId;
    // let  orderId = uuidv4()
    // orderId = orderId.slice(0,8);
    // creditPut = credits;
    // //payment


    // const transactionData = {
    //     userId,
    //     credits
    // };
    
    // // Encode user ID and credits in a simple way (You can also use JWT or DB for better security)
    // const encodedData = Buffer.from(JSON.stringify(transactionData)).toString("base64");
    
    // // Append it to orderId
    // const merchantTransactionId = `${orderId}_${encodedData}`;

    let orderId = uuidv4().replace(/-/g, "").slice(0, 12); // Use 12 chars for uniqueness
    creditPut = credits;

    const transactionData = { userId, credits };

    // Use SHA-256 for security (8-char hash)
    const hash = crypto.createHash("sha256").update(JSON.stringify(transactionData)).digest("hex").slice(0, 8);

    // Construct merchantTransactionId
  //  const merchantTransactionId = `${orderId}_${hash}`;
    const merchantTransactionId = `${userId}_${credits}`;

    logger.info("Transaction ID:", merchantTransactionId);
    logger.info(merchantTransactionId);
    const paymentPayload = {
        merchantId : MERCHANT_ID,
        merchantUserId: userId,
        amount : amount * 100,
        // merchantTransactionId: orderId,
        // redirectUrl: `${redirectUrl}/?id=${orderId}`
        merchantTransactionId: merchantTransactionId, 
    redirectUrl: `${redirectUrl}/?id=${merchantTransactionId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    }

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    const keyIndex = 1
    const string  = payload + '/pg/v1/pay' + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'POST',
        url:MERCHANT_BASE_URL,
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data :{
            request : payload
        }
    }
    try {
        
        const response = await axios.request(option);
        console.log("respone url:", response.data.data.instrumentResponse.redirectInfo.url)
         res.status(200).json({msg : "OK", url: response.data.data.instrumentResponse.redirectInfo.url})
    } catch (error) {
        console.log("error in payment", error)
        res.status(500).json({error : 'Failed to initiate payment'})
    }

});


router.post('/status', async (req, res) => {
    const merchantTransactionId = req.query.id;
//let userId = globalUserId;
   // Extract encoded user data
  // const parts = merchantTransactionId.split("_");
   const [userId, credits] = merchantTransactionId.split("_");
//    if (parts.length < 2) {
//        return res.status(400).json({ message: "Invalid transaction ID" });
//    }

//    const encodedData = parts.slice(1).join("_"); // In case the encoded data had underscores
//    const decodedData = JSON.parse(Buffer.from(encodedData, "base64").toString());

//    const userId = decodedData.userId;
//    const creditsToAdd = decodedData.credits;
    const keyIndex = 1
    const string  = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'GET',
        url:`${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': MERCHANT_ID
        },
    }


try {
    const response = await axios.request(option);
    
    if (response.data.success === true) {
        let user = await User.findOne({ googleId: userId });
        if (!user) {
            return res.status(404).json({ message: `User not found${userId}` });
        }

        user.credits += creditPut;
        await user.save();

        return res.redirect(successUrl);
    } else {
        return res.redirect(failureUrl);
    }
} catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
}

});

module.exports = router;
