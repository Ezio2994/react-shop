import React, { useState, useEffect} from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard"
import { firestore } from "../../firebase"


const ProductCardList = (props) => {
  const { user } = props
  const [dataBase, setDataBase] = useState([])
  const [userData, setUserData] = useState([])


  const array1 = userData.map(data => data.id)
  const array2 = dataBase.map(data => data.id)


const filteredArray = array1.filter(value => array2.includes(value));

console.log(filteredArray);


  const fetchFromDataBase = () => {
    firestore
    .collection("dataBase")
    .get()
    .then((querySnapshot) => {
      const currentData = querySnapshot.docs.map((doc) => doc.data());
      setDataBase(currentData)
    });
  }

  const fetchFromUserFav = () => {
    firestore
      .collection('users')
      .doc(user.uid)
      .collection("favourites")
      .get()
      .then((querySnapshot) => {
        const currentData = querySnapshot.docs.map(doc => doc.data());
        setUserData(currentData)
      })
      .catch((err) => console.error(err));
  };


  const addToFav = (product) => {
    firestore
      .collection('users')
      .doc(user.uid)
      .collection("favourites")
      .doc(product.name)
      .set(product)
      .then(fetchFromUserFav)
      .catch((err) => console.log(err));
  };

  const removeFromFav = (product) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("favourites")
      .doc(product.name)
      .delete()
      .then(fetchFromUserFav)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFromDataBase()
  }, [])

  useEffect(() => {
    if (user) {
      fetchFromUserFav()
    }
  }, [user])


  const getProductJsx = (product) => (
    <div key={product.id}>
      <ProductCard product={product} user={user} filteredArray={filteredArray} addToFav={addToFav} removeFromFav={removeFromFav} />
    </div>
  );


  return <section className={styles.cards}>{dataBase.map(getProductJsx)}</section>;

};

export default ProductCardList;
