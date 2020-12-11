import React, { useEffect, useState } from "react";
import styles from "./CartProduct.module.scss";

const CartProduct = (props) => {
  const { id, name, img, price, quantityToOrder } = props.product;

  const {
    removeFromCart,
    updateQuantity,
    dataBase,
    removeFromGuestCart,
    user,
  } = props;

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    setTotal(quantityToOrder * price);
  };

  useEffect(() => {
    getTotal();
  }, []);

  const available = dataBase.map((data) => {
    if (data.id === id && data.availability >= quantityToOrder) {
      return true;
    } else {
      return null;
    }
  });

  const filteredCartQuantity = available.filter(
    (quantity) => quantity !== null
  );

  if (!filteredCartQuantity.length && user) {
    removeFromCart(props.product);
  } else if (!filteredCartQuantity.length && !user) {
    removeFromGuestCart(props.product);
  }

  return (
    <div
      onLoad={() => updateQuantity(quantityToOrder, id, "-")}
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
        <button
          onClick={() => {
            if (user) {
              removeFromCart(props.product);
            } else {
              removeFromGuestCart(props.product);
            }
            updateQuantity(quantityToOrder, id, "+");
          }}
        >
          Remove
        </button>
      </article>
    </div>
  );
};

export default CartProduct;
