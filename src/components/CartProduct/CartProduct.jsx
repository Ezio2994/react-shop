import React, { useEffect, useState } from "react";
import styles from "./CartProduct.module.scss";

const CartProduct = (props) => {
  const { id, name, img, price, quantityToOrder } = props.product;

  const { removeFromCart, updateQuantity } = props;

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    setTotal(quantityToOrder * price);
  };

  useEffect(() => {
    getTotal();
  }, []);

  // useEffect(() => {
  //   updateQuantity(quantityToOrder, id);
  // }, []);

  return (
    <div
      onLoad={() => updateQuantity(quantityToOrder, id)}
      className={styles.cartProduct}
    >
      <article>
        <img src={img} alt="" />
        <p>{name}</p>
      </article>
      <article>
        <p>{quantityToOrder} *</p>
        <p>£{price} =</p>
        <p> £{total}</p>
        <button onClick={() => removeFromCart(props.product)}>Remove</button>
      </article>
    </div>
  );
};

export default CartProduct;
