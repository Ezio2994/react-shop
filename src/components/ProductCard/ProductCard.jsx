import React, { useContext } from "react";
import styles from "./ProductCard.module.scss";
import "../../data/fa-library";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";
import ExpandedCard from "../ExpandedCard/ExpandedCard";
import disableScroll from "disable-scroll";

const ProductCard = (props) => {
  const userContext = useContext(UserContext);
  const { signIn, user } = userContext;
  const cartContext = useContext(CartContext);
  const { userCart } = cartContext;

  const { name, img, price, description, category } = props.product;
  const { setExpanded, expanded, cartOn, setCartOn, isFav } = props;

  const thisProductOnCart = userCart.length
    ? userCart.find((product) => product.name === name)
    : null;

  return (
    <>
      <article
        onClick={() => {
          setExpanded(name);
          disableScroll.on();
          if (cartOn) {
            setCartOn(false);
          }
        }}
        style={cartOn ? { opacity: "0.5", pointerEvents: "none" } : null}
        className={`${styles.productCard} ${styles.fadeIn}`}
      >
        <div className={styles.productInfos}>
          <h2>
            {name}{" "}
            <button
              style={
                category === "v" || category === "vg"
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
            >
              {category === "v" || category === "vg" ? category : ""}
            </button>
          </h2>
          <p>£{price}</p>
          <p>
            {description.slice(0, 80) + (description.length > 80 ? "..." : "")}
          </p>
        </div>
        <div className={styles.imgContainer}>
          <div>
            <img src={img} alt="" />
            {thisProductOnCart ? (
              <span>{thisProductOnCart.quantityToOrder}</span>
            ) : null}
          </div>
          <p>View Details</p>
        </div>
      </article>
      <ExpandedCard
        setExpanded={setExpanded}
        expanded={expanded}
        product={props.product}
        user={user}
        signIn={signIn}
        isFav={isFav}
      />
    </>
  );
};

export default ProductCard;
