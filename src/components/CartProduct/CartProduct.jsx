import React, { useContext } from "react";
import styles from "./CartProduct.module.scss";
import { CrudContext } from "../../context/crudContext";
import { CartContext } from "../../context/cartContext";

const CartProduct = (props) => {
  const crudContext = useContext(CrudContext);
  const { dataBase } = crudContext;
  const cartContext = useContext(CartContext);
  const { removeFromCart, updateQuantityToOrder, userCart, setUserCart } =
    cartContext;
  const { name, img, price, quantityToOrder } = props.product;

  const dataBaseProduct = dataBase.find((data) => data.name === name);

  const updateQuantity = (action) => {
    updateQuantityToOrder(name, action);

    if (quantityToOrder <= 1 && action === "minus") {
      removeFromCart(props.product);
    }

    setUserCart(
      userCart
        .map((product) => {
          if (product.name === name && action === "plus") {
            return { ...product, quantityToOrder: product.quantityToOrder + 1 };
          } else if (product.name === name && action === "minus") {
            if (quantityToOrder <= 1) {
              return null;
            } else {
              return {
                ...product,
                quantityToOrder: product.quantityToOrder - 1,
              };
            }
          } else {
            return product;
          }
        })
        .filter((product) => product !== null)
    );
  };

  return (
    <div className={styles.cartProduct}>
      <div className={styles.cartSides}>
        <h2>{name}</h2>
        <p>Availability: {dataBaseProduct.availability}</p>
        <div className={styles.quantity}>
          <button onClick={() => updateQuantity("minus")}>-</button>
          <input
            type="text"
            name={name + " quantity"}
            id={name + " quantity"}
            readOnly
            value={quantityToOrder}
          />
          <button onClick={() => updateQuantity("plus")}>+</button>
        </div>
      </div>
      <div className={styles.cartSides}>
        <img src={img} alt={name} />
        <span>£{quantityToOrder * price}</span>
      </div>
    </div>
  );
};

export default CartProduct;
