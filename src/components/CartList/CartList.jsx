import React from "react";
import styles from "./CartList.module.scss";

import CartProduct from "../../components/CartProduct";

const CartList = (props) => {
  const {
    user,
    userCart,
    removeFromCart,
    updateQuantity,
    guestCart,
    dataBase,
    removeFromGuestCart,
  } = props;

  const isUser = user ? userCart : guestCart;

  const getCartProductJsx = (product) => (
    <div className={styles.cartContainer} key={product.id}>
      <CartProduct
        product={product}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        dataBase={dataBase}
        removeFromGuestCart={removeFromGuestCart}
        user={user}
      />
    </div>
  );

  return <section>{isUser.map(getCartProductJsx)}</section>;
};

export default CartList;
