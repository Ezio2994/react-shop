import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./Cart.module.scss";
import firebase, { firestore } from "../../firebase";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";
import { CrudContext } from "../../context/crudContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigate } from "@reach/router";
import CartProduct from "../../components/CartProduct";

const Cart = () => {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const crudContext = useContext(CrudContext);
  const { user } = userContext;
  const { userCart, setUserCart } = cartContext;
  const { bought } = crudContext;

  const cartTotal = useRef();

  const userTotalCart = userCart.map((cart) => {
    const total = cart.price * cart.quantityToOrder;
    return total;
  });

  const updateQuantity = () => {
    userCart.forEach((product) =>
      updateDataBaseQuantity(product.name, product.quantityToOrder)
    );
  };

  const updateDataBaseQuantity = (name, quantity) => {
    console.log(name, quantity);
    firestore
      .collection("dataBase")
      .doc(name)
      .update({
        availability: firebase.firestore.FieldValue.increment(-quantity),
      })
      .catch((err) => console.log(err));
  };

  const totalCartPrice = userTotalCart.reduce((a, b) => a + b, 0);

  const getCartProductJsx = (product) => (
    <div className={styles.cartContainer} key={product.name}>
      <CartProduct cartTotal={cartTotal} product={product} user={user} />
    </div>
  );

  return (
    <>
      <section className={styles.cart}>
        <div
          onClick={() => navigate("/products")}
          className={styles.cartTopSection}
        >
          <FontAwesomeIcon icon="arrow-left" /> <p>Continue Shopping</p>
        </div>
        {userCart.map(getCartProductJsx)}
        <article className={styles.checkOut}>
          <div>
            <p>SubTotal:</p>{" "}
            <span>
              £
              <input
                ref={cartTotal}
                readOnly
                type="number"
                name="total"
                id="total"
                value={totalCartPrice}
              ></input>
            </span>
          </div>
          <p>Taxes and shipping calculated at checkout</p>
          <button
            disabled={userCart.length ? false : true}
            onClick={() => {
              if (userCart.length) {
                updateQuantity();
                bought();
                setUserCart([]);
                alert("This is only a demonstration website");
              }
            }}
          >
            Check Out
          </button>
        </article>
      </section>
    </>
  );
};

export default Cart;
