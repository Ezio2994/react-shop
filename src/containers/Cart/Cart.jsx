import React, { useContext } from "react";
import styles from "./Cart.module.scss";
import firebase, { firestore } from "../../firebase";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";
import { CrudContext } from "../../context/crudContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartProduct from "../../components/CartProduct";
import disableScroll from "disable-scroll";

const Cart = (props) => {
  const { cartOn, setCartOn, width } = props;
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const crudContext = useContext(CrudContext);
  const { user } = userContext;
  const { userCart, setUserCart } = cartContext;
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
    <CartProduct key={product.name} product={product} user={user} />
  );
  console.log(cartOn);
  return (
    <>
      <section
        style={cartOn ? { display: "block" } : { display: "none" }}
        className={styles.cart}
        onWheel={() => disableScroll.off()}
      >
        <div
          onClick={() => {
            setCartOn(false);
            disableScroll.off();
          }}
          className={styles.cartTopSection}
        >
          <FontAwesomeIcon icon="arrow-left" /> <p>Continue Shopping</p>
        </div>
        <section className={styles.productsContainer}>
          {userCart.length ? (
            userCart.map(getCartProductJsx)
          ) : (
            <h3>Your cart is currently empty.</h3>
          )}
        </section>
        <article className={styles.checkOut}>
          <div>
            <p>SubTotal:</p>{" "}
            <span>
              £
              <input
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
