import React, { useState } from "react";
import styles from "./ContactForm.module.scss";

const emptyForm = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState(emptyForm);

  const { name, lastName, email, phone, message } = form;

  const manageForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => {
      return { ...form, [name]: value };
    });
  };
  const manageSubmit = (e) => {
    e.preventDefault();
    alert("This is only a demostrative website");
    setForm(emptyForm);
  };

  return (
    <form className={styles.contactForm}>
      <div>
        <label htmlFor="name">First Name *</label>
        <input
          placeholder="Write you first name here"
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={manageForm}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name *</label>
        <input
          placeholder="Write your last name here"
          type="text"
          name="lastName"
          id="lastName"
          required
          value={lastName}
          onChange={manageForm}
        />
      </div>
      <div>
        <label htmlFor="email">Email *</label>
        <input
          placeholder="Write your email here"
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={manageForm}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          placeholder="Write your phone number here"
          type="tel"
          name="phone"
          id="phone"
          value={phone}
          onChange={manageForm}
        />
      </div>
      <div>
        <label htmlFor="message">Message *</label>
        <textarea
          placeholder="Write your message here"
          name="message"
          id=""
          cols="30"
          rows="10"
          required
          value={message}
          onChange={manageForm}
        ></textarea>
      </div>
      <button onSubmit={manageSubmit} type="submit">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
