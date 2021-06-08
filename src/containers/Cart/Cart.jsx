import React, { useContext } from "react";
import styles from "./Cart.module.scss";
import firebase, { firestore } from "../../firebase";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";
import { CrudContext } from "../../context/crudContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartProduct from "../../components/CartProduct";

const Cart = (props) => {
  const { cartOn, setCartOn, width } = props;
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const crudContext = useContext(CrudContext);
  const { user } = userContext;
  const { userCart, setUserCart, cartTotal } = cartContext;
  const { bought } = crudContext;

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
    <CartProduct
      key={product.name}
      cartTotal={cartTotal}
      product={product}
      user={user}
    />
  );

  return (
    <>
      <section
        style={
          width < 769
            ? cartOn
              ? { display: "block" }
              : { display: "none" }
            : null
        }
        className={
          width > 769 && !cartOn
            ? `${styles.cart} ${styles.largeScreen}`
            : styles.cart
        }
      >
        <div onClick={() => setCartOn(false)} className={styles.cartTopSection}>
          <FontAwesomeIcon icon="arrow-left" /> <p>Continue Shopping</p>
        </div>
        <section
          // style={expanded ? { height: "90vh", overflow: "hidden" } : null}
          className={styles.productsContainer}
        >
          {userCart.map(getCartProductJsx)}
        </section>
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
