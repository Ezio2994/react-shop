import React, { useEffect, useState, useContext } from "react";
import styles from "./ProductCard.module.scss";
import NotFound from "../NotFound";
import "../../data/fa-library";
import { UserContext } from "../../context/userContext";
import ExpandedCard from "../ExpandedCard/ExpandedCard";

const ProductCard = (props) => {
  const userContext = useContext(UserContext);

  const { signIn, user } = userContext;

  const { name, img, availability, price, description, category } =
    props.product;
  const { setExpanded, expanded } = props;

  return (
    <>
      <article onClick={() => setExpanded(name)} className={styles.productCard}>
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
          <img src={img} alt="" />
          <p>View Details</p>
        </div>
      </article>
      <ExpandedCard
        setExpanded={setExpanded}
        expanded={expanded}
        product={props.product}
        user={user}
        signIn={signIn}
      />
    </>
  );
};

export default ProductCard;
