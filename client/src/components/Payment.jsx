import React from "react";
import logo from "./logo.svg";
import "./App.css";

function PaymentGateway() {
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

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const token = localStorage.getItem("token");
        const result = await fetch("https://medflow-1.onrender.com/api/v1/pay", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!result.ok) {
            alert("Server error. Are you online?");
            return;
        }

        const data = await result.json();

        const { amount, id: order_id, currency } = data;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Make sure this key is correct
            amount: amount.toString() || "0",
            currency: currency,
            name: "Soumya Corp.",
            description: "Test Transaction",
            image: logo,
            order_id: order_id,
            handler: async function (response) {
                const paymentData = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await fetch("http://localhost:5000/payment/success", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentData),
                });

                const paymentResult = await result.json();
                alert(paymentResult.msg);
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Buy React now!</p>
                <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹500
                </button>
            </header>
        </div>
    );
}

export default PaymentGateway;
