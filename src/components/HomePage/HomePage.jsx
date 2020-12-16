import React, { useContext } from "react";
import styles from "./HomePage.module.scss";
import { UserContext } from "../../context/userContext"
import { Link, navigate } from "@reach/router";

const HomePage = () => {
  const userContext = useContext(UserContext);
  const { signIn, user } = userContext
  return (
    <section className={styles.homePage}>
      <article>
        <h1>The Sicilian Shop</h1>
        <p>Hello there! Welcome into the Sicilian Shop, in here you're gonna find awesome traditional sicilian food made with the freshest ingridients imported from Palermo, cooked from our sicilian chefs and ready to be delivered to you home!</p>
        <button onClick={() => {
          if (!user) {
            signIn()
          } else {
            navigate("/products")
          }
        }}>LogIn with Google</button>
        <Link to='/products'>
          <button>Enter as a visitor</button>
        </Link>
      </article>
    </section>
  );
};

export default HomePage;
