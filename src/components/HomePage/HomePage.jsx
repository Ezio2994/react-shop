import React from "react";
import styles from "./HomePage.module.scss";
import { navigate } from "@reach/router";
import logo from "../../assets/cannoli.jpg";
import pasta from "../../assets/FI-23.jpg";
import traditionalFood from "../../assets/best-sicilian-food.jpg";
import traditionalFoodMobile from "../../assets/sicilian-sweets.jpg";
import NavBar from "../NavBar";

const HomePage = () => {
  return (
    <>
      <section className={styles.homePage}>
        <div className={styles.heroImage}>
          <img src={logo} alt="" />
          <NavBar />
        </div>

        <h1>Best sicilian food</h1>
        <p>
          Hello there! Welcome into the Sicilian Shop, in here you're gonna find
          awesome traditional sicilian food made with the freshest ingridients
          imported from Palermo, cooked from our sicilian chefs and ready to be
          delivered to you home!
        </p>

        <button
          className={styles.homepageButton}
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </section>
      <section className={styles.homePageBottomSection}>
        <h2>Handmade daily</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          laborum, beatae sit adipisci aliquid quidem impedit veniam id enim
          quas et exercitationem. Dicta et expedita rerum voluptatem velit
          necessitatibus odit.
        </p>
        <img src={pasta} alt="pastahomemade" />

        <h2>Traditional Sicilian Desserts</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
          molestias atque vitae repudiandae nemo quidem nulla accusamus iste
          autem? At aspernatur laboriosam quos quisquam accusantium
          reprehenderit nisi sint minima molestiae?
        </p>
        <img
          src={
            window.innerWidth > 500 ? traditionalFood : traditionalFoodMobile
          }
          alt="traditional-desserts"
        />
      </section>
    </>
  );
};

export default HomePage;
