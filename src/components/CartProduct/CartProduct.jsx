import React, { useContext, useEffect, useState } from "react";
import styles from "./CartProduct.module.scss";
import { CrudContext } from "../../context/crudContext";

const CartProduct = (props) => {
  const crudContext = useContext(CrudContext)
  const { dataBase, removeFromCart, removeFromGuestCart } = crudContext;
  const { name, img, price, quantityToOrder } = props.product;
  const { user } = props;

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    setTotal(quantityToOrder * price);
  };

  useEffect(() => {
    getTotal();
  }, []);

  const available = dataBase.map((data) => {
    if (data.name === name && data.availability >= quantityToOrder) {
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
      className={styles.cartProduct}
    >
      <article>
        <img src={img} alt="" />
        <p>{name}</p>
      </article>
      <article className={styles.money}>
        <p>{quantityToOrder} *</p>
        <p>£{price} =</p>
        <p> £{total}</p>
      </article>
      <button
        onClick={() => {
          if (user) {
            removeFromCart(props.product);
          } else {
            removeFromGuestCart(props.product);
          }
        }}
      > Remove </button>
    </div>
  );
};

export default CartProduct;
