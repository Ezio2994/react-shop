import logo from './logo.svg';
import './App.scss';
import React, {useState, useEffect} from "react"
import NavBar from "./components/NavBar"
import Routes from "./containers/Routes"
import firebase, { provider } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    getUser();
  })

  return (
    <div className="App">
      <NavBar signIn={signIn} signOut={signOut} user={user} />
      <Routes user={user} />
      
    </div>
  );
}

export default App;
