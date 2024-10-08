import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const handlePayment = async () => {
        const orderUrl = '/api/payment/create-order';
        const amount = 50000; // amount in the smallest currency unit (e.g., 50000 paise = 500 INR)

        const { data } = await axios.post(orderUrl, { amount });

        const options = {
            key: 'YOUR_RAZORPAY_KEY',
            amount: data.amount,
            currency: data.currency,
            name: 'Your Company Name',
            description: 'Test Transaction',
            order_id: data.id,
            handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            },
            prefill: {
                name: 'Test User',
                email: 'test.user@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Corporate Office',
            },
            theme: {
                color: '#F37254',
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const uEmail = localStorage.getItem("useremail");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!uEmail){
            navigate("/userlogin")
        }
    },[uEmail,navigate])

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;
