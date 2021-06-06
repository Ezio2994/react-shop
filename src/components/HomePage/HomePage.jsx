import React, { useContext } from "react";
import styles from "./HomePage.module.scss";
import { UserContext } from "../../context/userContext";
import { Link, navigate } from "@reach/router";
import logo from "../../assets/cannoli.jpg";
import NavBar from "../NavBar";

const HomePage = () => {
  const userContext = useContext(UserContext);
  const { signIn, user } = userContext;
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

        <button onClick={() => navigate("/products")}>Shop Now</button>
      </section>
    </>
  );
};

export default HomePage;
