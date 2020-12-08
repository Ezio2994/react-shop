import React, { useEffect, useState } from "react";
import styles from "./CartProduct.module.scss";

const CartProduct = (props) => {
  const { name, img, price, quantityToOrder } = props.product;

  const { removeFromCart, dataBase } = props;

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    setTotal(quantityToOrder * price);
  };

  useEffect(() => {
    getTotal();
  }, []);

  const [dataBaseQuantity, setDataBaseQuantity] = useState(0);

  const dataBaseQuantitySetter = dataBase.map((cart) => {
    const name = cart.name;
    const quantity = cart.availability;
    return { name: name, quantity: quantity };
  });

  const prova = () => {
    for (let index = 0; index < dataBaseQuantitySetter.length; index++) {
      if (dataBaseQuantitySetter[index].name === name) {
        const newValue = dataBaseQuantitySetter[index].quantity;
        setDataBaseQuantity(newValue);
      }
    }
  };

  console.log(dataBaseQuantity - quantityToOrder);

  useEffect(() => {
    prova();
  }, []);

  return (
    <div className={styles.cartProduct}>
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
