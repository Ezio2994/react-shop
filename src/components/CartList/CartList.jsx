import React from "react";
import styles from "./CartList.module.scss";

import CartProduct from "../../components/CartProduct";

const CartList = (props) => {
  const { userCart, removeFromCart, updateQuantity } = props;

  const getCartProductJsx = (product) => (
    <div className={styles.cartContainer} key={product.id}>
      <CartProduct
        product={product}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );

  return <section>{userCart.map(getCartProductJsx)}</section>;
};

export default CartList;
