import React, { useContext, useState } from "react";
import styles from "./Settings.module.scss";
import NavBar from "../../components/NavBar";
import { UserContext } from "../../context/userContext";
import { CrudContext } from "../../context/crudContext";
import { CartContext } from "../../context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const emptyProduct = {
  name: "",
  description: "",
  course: "",
  category: "",
  img: "",
  price: "",
  availability: "",
};

const Settings = () => {
  const userContext = useContext(UserContext);
  const crudContext = useContext(CrudContext);
  const cartContext = useContext(CartContext);
  const { user, isUserAdmin, signOut } = userContext;
  const { dataBase, addToDataBase, updateDataBase, deleteDataBaseProduct } =
    crudContext;
  const { setUserCart } = cartContext;
  const [product, setProduct] = useState(emptyProduct);
  const [view, setView] = useState("");

  if (!user) {
    return null;
  } else {
    const isAdmin = isUserAdmin ? "Yes" : "No";

    const { name, description, course, category, img, price, availability } =
      product;

    const handleChange = (e) => {
      const name = e.target.name;
      setProduct({ ...product, [name]: e.target.value });
    };

    const allNamesInDataBase = dataBase.map((data) => data.name);

    const handleSubmit = (e) => {
      e.preventDefault();
      const cleanedProduct = cleanFormValues(product);

      if (allNamesInDataBase.includes(cleanedProduct.name)) {
        alert("This product name already exists");
      } else if (!isUserAdmin) {
        alert(
          "You need admin rights to add products, in order to get them or having more info about what I could build for you contact me via email on ezio.intravaia@hotmail.com"
        );
      } else {
        console.log(cleanedProduct);
        addToDataBase(cleanedProduct);
        alert("Product added");
        clearForm();
      }
    };

    const handleSubmitUpdate = (e) => {
      e.preventDefault();
      const productToUpdate = Object.values(product).filter(
        (product) => product !== ""
      );
      const updatedProduct = {
        name: productToUpdate[0],
        price: productToUpdate[1],
        availability: productToUpdate[2],
      };
      const cleanedProduct = cleanFormValues(updatedProduct);

      if (!allNamesInDataBase.includes(cleanedProduct.name)) {
        alert("This product name doesn't exists");
      } else if (!isUserAdmin) {
        alert(
          "You need admin rights to update products, in order to get them or having more info about what I could build for you contact me via email on ezio.intravaia@hotmail.com"
        );
      } else {
        updateDataBase(cleanedProduct);
        alert("Product updated");
        clearForm();
      }
    };

    const handleSubmitDelete = (e) => {
      e.preventDefault();

      if (!allNamesInDataBase.includes(product.name)) {
        alert("This product name doesn't exists");
      } else if (!isUserAdmin) {
        alert(
          "You need admin rights to delete products, in order to get them or having more info about what I could build for you contact me via email on ezio.intravaia@hotmail.com"
        );
      } else {
        deleteDataBaseProduct(product.name);
        alert("Product deleted");
        clearForm();
      }
    };

    const cleanFormValues = (formValues) => {
      formValues.price = Number(formValues.price);
      formValues.availability = Number(formValues.availability);
      return formValues;
    };

    const clearForm = () => {
      setProduct(emptyProduct);
    };

    const inputTextCreator = (name, label, value) => {
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      );
    };

    const inputNumber = (name, label, value) => {
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <input
            type="number"
            name={name}
            min="1"
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      );
    };

    return (
      <section className={styles.settings}>
        <NavBar />
        <h2 className={styles.pageHeader}>Settings</h2>
        <div className={styles.menu}>
          <article>
            <p>Name:</p> {user.displayName}
          </article>
          <article>
            <p>Email:</p> {user.email}
          </article>
          <article>
            <p>Admin right:</p> {isAdmin}
          </article>

          <button
            onClick={() => {
              setUserCart([]);
              signOut();
            }}
          >
            <FontAwesomeIcon icon="sign-out-alt" /> Sign out
          </button>

          <h3>Admin Pannel</h3>

          <button
            onClick={() => {
              if (view !== "newProduct") {
                setView("newProduct");
                clearForm();
              } else if (view === "newProduct") {
                setView("");
              }
            }}
          >
            Add new product
          </button>
          <form
            style={
              view === "newProduct" ? { display: "flex" } : { display: "none" }
            }
            onSubmit={handleSubmit}
          >
            {inputTextCreator("name", "What's the product name?", name)}
            {inputTextCreator(
              "description",
              "Describe yout product",
              description
            )}
            {inputTextCreator("img", "URL of the image you want to use", img)}
            {inputNumber("price", "Price", price)}
            {inputNumber(
              "availability",
              "How many pieces you have in stock",
              availability
            )}
            <div>
              <label htmlFor="course">Choose the course:</label>
              <select
                id="course"
                name="course"
                value={course}
                onChange={handleChange}
                required
              >
                <option defaultValue=""></option>
                <option value="starter">Starter</option>
                <option value="main">Main</option>
                <option value="dessert">dessert</option>
              </select>
            </div>
            <div>
              <label htmlFor="category">Choose the category:</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={handleChange}
                required
              >
                <option defaultValue=""></option>
                <option value="v">Vegeterian</option>
                <option value="vg">Vegan</option>
                <option value="fish">Fish</option>
                <option value="meat">Meat</option>
              </select>
            </div>
            <input type="submit" value="Save" onChange={handleChange} />
          </form>
          <button
            onClick={() => {
              if (view !== "updateProduct") {
                setView("updateProduct");
                clearForm();
              } else if (view === "updateProduct") {
                setView("");
              }
            }}
          >
            Update product price or quantity
          </button>
          <form
            onSubmit={handleSubmitUpdate}
            style={
              view === "updateProduct"
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            {inputTextCreator("name", "What's the product name?", name)}
            {inputNumber("price", "Price", price)}
            {inputNumber(
              "availability",
              "How many pieces you have in stock",
              availability
            )}
            <input type="submit" value="Submit" />
          </form>
          <button
            onClick={() => {
              if (view !== "deleteProduct") {
                setView("deleteProduct");
                clearForm();
              } else if (view === "deleteProduct") {
                setView("");
              }
            }}
          >
            Delete product
          </button>
          <form
            onSubmit={handleSubmitDelete}
            style={
              view === "deleteProduct"
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            {inputTextCreator("name", "What's the product name?", name)}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    );
  }
};

export default Settings;
