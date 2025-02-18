import React from 'react';
import razorpayImage from "../../assets/Images/HomeImages/razorpay.png";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import QR from "/payment-qr.png"

const makePayment = async () => {
  const stripe = await loadStripe(process.env.STRIPEKEY);

  const body = {
    products: cart
  }

  const heades = {
    "Content-Type": "application/json"
  }

  const response = await fetch(`${apiURL}/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })

  const session = await response.json();

  const result = stripe.redirectToCheckout({
    sessionId: session.id
  })

  if (result.error) {
    console.log(result.error)
  }
}

const PayNow = () => {

  const [loading, setLoading] = useState(false)

  const checkout = async () => {

    setLoading(true)

    const keyData = await fetch(`http://localhost:5173/api/getKey`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })


    let data = await fetch(`http://localhost:5173/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 5000 })

    })



    data = await data.json()

    const { order } = data;

    const options = {
      "key": keyData?.key, // Enter the Key ID generated from the Dashboard
      "amount": order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "",
      "name": "Rohith",
      "description": "Test Transaction",
      "image": "https://avatars.githubusercontent.com/u/130335161?v=4",
      "order_id": order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:5173//api/payment/paymentVerification",
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };


    var razor = new window.Razorpay(options);
    razor.open();

    setLoading(false)



  }

  return (
    <section className="bg-secondary py-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="bg-white rounded-lg overflow-hidden ">
        <div className="md:grid md:grid-cols-2">
          <div className="md:col-span-1 bg-primary text-secondary py-12 px-8 rounded-lg shadow-lg glassmorphism-content">
            <h2 className="text-3xl font-bold mb-4 text-secondary">Donate for School Growth</h2>
            <p className="text-lg mb-8">
              Your donation supports better resources, facilities, and opportunities for our students. Every contribution makes a difference in shaping their future!.
            </p>

            <div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className=" md:flex items-center justify-end col-span-1 mr-20"
            >
              <img
                src={QR}
                alt=""
                className="w-[180px] md:w-[200px]"
              />

            </div>
            {/** <img src={} alt="" height="150px" width="200px" />*/}
          </div>
          <div className="md:col-span-1 py-8 px-6 bg-gray-100 rounded-lg shadow-lg glassmorphism-content">
            <h3 className="text-2xl font-bold mb-4 text-secondary">Why Donate?</h3>
            <ul className="list-disc pl-6 text-secondary">
              <li className="mb-2">Support essential programs and resources</li>
              <li className="mb-2">Help enhance learning facilities and opportunities</li>
              <li className="mb-2">Make an immediate impact on our students' future
              </li>
            </ul>
            <div className="flex items-center justify-end gap-4 font-semibold tracking-wide mt-3">
              {/**
                   * <span className="text-[13px] sm:text-[15px] text-gray-600">Powered by</span>
                   * <img
                    src={razorpayImage}
                    alt="Razorpay"
                    className="w-28 h-16 sm:w-36 sm:h-20 bg-transparent transition-transform transform hover:scale-110 hover:shadow-lg duration-400 hover:cursor-pointer rounded-lg"
                  /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );


};

export default PayNow;