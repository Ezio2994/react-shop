import React, { useContext, useState } from "react";
import styles from "./Settings.module.scss";
import NavBar from "../../components/NavBar";
import { UserContext } from "../../context/userContext";
import { CrudContext } from "../../context/crudContext";

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
  const { user, isUserAdmin } = userContext;
  const { dataBase, addToDataBase, updateDataBase, deleteDataBaseProduct } =
    crudContext;
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

    const viewForm = view === "newProduct" ? styles.viewOn : null;
    const viewUpdateForm = view === "updateProduct" ? styles.viewOn : null;
    const viewDeleteForm = view === "deleteProduct" ? styles.viewOn : null;

    return (
      <section className={styles.settings}>
        <NavBar />
        <div className={styles.menu}>
          <h1>Settings</h1>
          <article>
            <p>Name:</p> {user.displayName}
          </article>
          <article>
            <p>Email:</p> {user.email}
          </article>
          <article>
            <p>Admin right:</p> {isAdmin}
          </article>
          <h2
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
          </h2>
          <form onSubmit={handleSubmit} className={viewForm}>
            <input
              type="text"
              name="name"
              placeholder="What's the product name?"
              value={name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="A description of the product?"
              value={description}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="img"
              placeholder="URL of the image you want to use"
              value={img}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              min="1"
              placeholder="Price"
              value={price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="availability"
              min="1"
              placeholder="How many pieces you have in stock"
              value={availability}
              onChange={handleChange}
              required
            />
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
            <input type="submit" value="Submit" onChange={handleChange} />
          </form>
          <h2
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
          </h2>
          <form onSubmit={handleSubmitUpdate} className={viewUpdateForm}>
            <input
              type="text"
              name="name"
              placeholder="Product name to update?"
              value={name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              min="1"
              placeholder="Price"
              value={price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="availability"
              min="1"
              placeholder="How many pieces you have in stock"
              value={availability}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Submit" />
          </form>
          <h2
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
          </h2>
          <form onSubmit={handleSubmitDelete} className={viewDeleteForm}>
            <input
              type="text"
              name="name"
              placeholder="Product name to delete"
              value={name}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    );
  }
};

export default Settings;
