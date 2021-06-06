import React, { useState, useContext } from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCardList = (props) => {
  const { dataBase } = props;
  const [selectedCourse, setSelectedCourse] = useState("All Food");
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(0);

  const courses = [
    "All Food",
    "Street Food",
    "Pasta",
    "Main Courses",
    "Desserts",
  ];

  let productToDisplay = dataBase;

  if (selectedCourse === "all") {
    productToDisplay = dataBase;
  } else if (selectedCourse === "Street Food") {
    productToDisplay = dataBase.filter((food) => food.course === "street food");
  } else if (selectedCourse === "Pasta") {
    productToDisplay = dataBase.filter((food) => food.course === "pasta");
  } else if (selectedCourse === "Main Courses") {
    productToDisplay = dataBase.filter((food) => food.course === "main");
  } else if (selectedCourse === "Desserts") {
    productToDisplay = dataBase.filter((food) => food.course === "dessert");
  }

  const coursesButton = courses.slice(index, index + 2).map((course) => {
    return (
      <button
        // className={styles.slideInLeft}
        key={course}
        style={
          course === selectedCourse ? { textDecoration: "underline" } : null
        }
        onClick={() => setSelectedCourse(course)}
      >
        {course}
      </button>
    );
  });

  const getProductJsx = (product) => (
    <ProductCard
      key={product.name}
      product={product}
      setExpanded={setExpanded}
      expanded={expanded}
    />
  );

  return (
    <section
      // style={expanded ? { height: "90vh", overflow: "hidden" } : null}
      className={styles.productsContainer}
    >
      <div className={styles.filters}>
        <FontAwesomeIcon
          style={
            index === 0 ? { display: "none" } : { display: "inline-block" }
          }
          onClick={() => setIndex(index - 1)}
          icon="chevron-left"
        />{" "}
        <div className={styles.slideInLeft}>{coursesButton}</div>
        <FontAwesomeIcon
          style={
            index === 3 ? { display: "none" } : { display: "inline-block" }
          }
          onClick={() => setIndex(index + 1)}
          icon="chevron-right"
        />
      </div>
      {productToDisplay.map(getProductJsx)}
    </section>
  );
};

export default ProductCardList;
