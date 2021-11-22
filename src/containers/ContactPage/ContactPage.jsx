import React from "react";
import NavBar from "../../components/NavBar";
import styles from "./ContactPage.module.scss";
import ContactForm from "../../components/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import image from "../../assets/Trecontrade-2017_33_FA.jpeg";

const ContactPage = () => {
  return (
    <>
      <NavBar hideCart />
      <main className={styles.contactPage}>
        <div>
          <h2>Have a question?</h2>
          <p>
            tel: 123-456-7890 <br /> info@something.com
          </p>
          <ContactForm />
        </div>
        <div>
          {" "}
          <article className={styles.socials}>
            <a target="_blank" href="https://www.facebook.com">
              <FontAwesomeIcon icon={["fab", "facebook"]} />
            </a>
            <a target="_blank" href="https://www.instagram.com/">
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </a>
            <a target="_blank" href="https://www.twitter.com/">
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
          </article>
          <img src={image} alt="" />
        </div>
      </main>
    </>
  );
};

export default ContactPage;
