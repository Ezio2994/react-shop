import React, { useState, useContext, useEffect } from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCardList = (props) => {
  const { dataBase } = props;
  const [selectedCourse, setSelectedCourse] = useState("All Food");
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const isAllCourses = width < 762 ? courses.slice(index, index + 2) : courses;
  const coursesButton = isAllCourses.map((course) => {
    return (
      <button
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
    <>
      <div className={styles.filters}>
        <FontAwesomeIcon
          style={
            width < 762
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
            width < 762
              ? index === 3
                ? { display: "none" }
                : { display: "inline-block" }
              : { display: "none" }
          }
          onClick={() => setIndex(index + 1)}
          icon="chevron-right"
        />
      </div>
      <section
        // style={expanded ? { height: "90vh", overflow: "hidden" } : null}
        className={styles.productsContainer}
      >
        {productToDisplay.map(getProductJsx)}
      </section>
    </>
  );
};

export default ProductCardList;
