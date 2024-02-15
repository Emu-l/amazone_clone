import React, { useContext, useState } from "react";
import Classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut.js";
import { DataContext } from "../../Components/DataProvider/DataProvider.js";
import ProductCard from "../../Components/Product/ProductCard.js";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import Auth from "../Auth/Auth.js";
import { colors } from "@mui/material";
import CurrencyFormat from "../../Components/Currency/CurrencyFormat.js";
import { axiosInstance } from "../../Components/Api/axios.js";
import { ClipLoader } from "react-spinners";
import { db} from "../../Utility/firebase.js";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type.js";
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setcardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (e) => {
    e?.error?.message ? setcardError(e?.error?.message) : setcardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })

dispatch({type: Type.EMPTY_BASKET})


      setProcessing(false);
navigate("/orders", {state: {msg: "you have placed a new order "}})
    } catch (error) {
      setProcessing(false)
    }
  };

  return (
    <LayOut>
      <div className={Classes.Payment_header}>checkout {totalItem} items </div>
      <section className={Classes.Payment}>
        <div className={Classes.flex}>
          <h3></h3>
          <div>{user?.email}</div>
          <div></div>
          <div></div>
        </div>

        <hr />

        <div className={Classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className={Classes.flex}>
          <h3>Payment methods</h3>
          <div className={Classes.payment_card_container}>
            <div className={Classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={Classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    
                    {
                      processing?(
                        <div className={Classes.loading}>
                          <ClipLoader color="grey" size={15}/>
                          <p>Please wait ...</p>
                        </div> 
                      ):"Pay Now"
                    }
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
