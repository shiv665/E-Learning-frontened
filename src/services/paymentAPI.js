import { apiConnector } from "./apiConnector";
import { paymentAPI } from "./api";
import toast from "react-hot-toast";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
export async function buyCourse(token, user, courses, navigate, dispatch) {
   
    try{
            //1. load the script
        const res= await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Something went wrong");
            return;
        }
          //2. initiate the order
          const orderResponse = await apiConnector("POST", paymentAPI.PAYMENT_API, {
            courses: courses,
            token: token,
            userId: user._id,
          }); //add the payload
        console.log("Order Response:", orderResponse);
        if(!orderResponse.data.success){
            console.log(orderResponse.data.message);
            return;
        }
        console.log("Order Response:", orderResponse);
        const options={
            key: 'rzp_test_R5sEffu8xB06Lf', 
            amount: orderResponse.data.amount,
            currency: orderResponse.data.currency,
            order_id: orderResponse.data.orderId,
            name: "E-Learning Platform",
            description: "Thank you for purchasing the course",
            image: "", 
            prefill:
            {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
            },
            handler: async function (response) {
                try {
                    console.log("Payment Response:", response);
                    
                    // Verify payment
                    await verifyPaymentSignature({ ...response, courses }, user, token, navigate, dispatch);
                    
                    // Send success email
                    await sendPaymentSuccessEmail(response, orderResponse.data.amount, token, user, courses);
                    
                    toast.success("Payment successful!");
                } catch (err) {
                    console.error("Error handling payment:", err);
                    toast.error("Payment verification failed. Please contact support.");
                } }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            console.error("Payment Failed:", response.error);
            toast.error("Payment failed. Please try again.");
        });


    }catch(error){
        console.log("Error in buyCourse:", error);
    }
    
}

async function sendPaymentSuccessEmail(response, amount, token, user, courses) {
    try{
        const Eresponse=await apiConnector("POST", paymentAPI.SEND_PAYMENT_SUCCESS_EMAIL, {
            orderId: response.razorpay_order_id,
            amount: amount,
            userId: user._id,
            token: token,
            courses: courses, });

            console.log("Email Response:", Eresponse);

    }catch(error){
        console.error("Error sending payment success email:", error.message);
    }
}

async function verifyPaymentSignature(bodyData,user, token, navigate, dispatch) {
    
    try{
        bodyData.token = token; 
        console.log("Verification Data:", bodyData);
        const response = await apiConnector("POST", paymentAPI.PAYMENT_VERIFY_API, bodyData);
        if(!response.data.success){
            toast.error(response.data.message);
            return;
        }
        toast.success("Payment verified successfully");
        
        navigate(`/Dashboard/student/${user._id}`);
        

    }catch(error) {
        toast.error("Payment verification failed");
        console.error("Payment verification error:", error);
        return;
    }
    
    // dispatch(setPaymentLoading(false));
}
