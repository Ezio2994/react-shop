import React, { useContext } from "react";
import styles from "./CartList.module.scss";

import CartProduct from "../../components/CartProduct";

const CartList = (props) => {
  const { user, userCart, guestCart } = props;

  const isUser = user ? userCart : guestCart;

  const getCartProductJsx = (product) => (
    <div className={styles.cartContainer} key={product.name}>
      <CartProduct
        product={product}
        user={user}
      />
    </div>
  );

  return <section className={styles.cart}>{isUser.map(getCartProductJsx)}</section>;
};

export default CartList;
