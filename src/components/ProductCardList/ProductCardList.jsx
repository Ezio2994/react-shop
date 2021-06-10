import React, { useState } from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCardList = (props) => {
  const { dataBase, cartOn, setCartOn, width, isFav } = props;
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

  const isAllCourses = width < 820 ? courses.slice(index, index + 2) : courses;
  const coursesButton = isAllCourses.map((course) => {
    return (
      <button
        key={course}
        style={
          course === selectedCourse
            ? { borderBottom: "2px solid black", color: "black" }
            : null
        }
        onClick={() => {
          setSelectedCourse(course);
          if (cartOn) {
            setCartOn(false);
          }
        }}
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
      cartOn={cartOn}
      setCartOn={setCartOn}
      isFav={isFav}
    />
  );

  return (
    <section
      style={
        width < 760
          ? cartOn
            ? { display: "none" }
            : { display: "block" }
          : null
      }
      className={width > 760 && cartOn ? styles.productLargeScreen : null}
    >
      <div className={styles.filters}>
        <FontAwesomeIcon
          style={
            width < 820
              ? index === 0
                ? { display: "none" }
                : { display: "inline-block" }
              : { display: "none" }
          }
          onClick={() => setIndex(index - 1)}
          icon="chevron-left"
        />{" "}
        <div>{coursesButton}</div>
        <FontAwesomeIcon
          style={
            width < 820
              ? index === 3
                ? { display: "none" }
                : { display: "inline-block" }
              : { display: "none" }
          }
          onClick={() => setIndex(index + 1)}
          icon="chevron-right"
        />
      </div>
      <section className={styles.productsContainer}>
        {productToDisplay.map(getProductJsx)}
      </section>
    </section>
  );
};

export default ProductCardList;
