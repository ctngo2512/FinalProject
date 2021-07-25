import React, { useState, useEffect } from 'react';
import fire from './fire';
import Login from './Login';
import Hero from './Hero';
import './App.css';

const App = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [userID, setUserID] = useState('');

  //clear inputs
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  //clear errors in login screen
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  //log into firebase using firebase authentication
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            clearInputs();
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            clearInputs();
            break;
        }
      });
      //expect(() =>{ clearInputs(); }).toBeCalled();
  };

  //sign up using firebase authentication
  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            clearInputs();
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            clearInputs();
            break;
        }
      });
  };

  //log out using firebase authentication
  const handleLogout = () => {
    fire.auth().signOut();
  };

  //clear inputs and set user
  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user){
        clearInputs();
        setUser(user);
        //alert(user.uid);
        setUserID(user.uid);
      }
      else {
        setUser("");
      }
    });
  };

  useEffect (() => {
    authListener();
  }, [])

  return (
    //if user is logged in go to hero page, otherwise go to login page
    <div className = "App">
      {user ? (
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Hero
            handleLogout={handleLogout}
            userID={fire.auth().currentUser.uid}
          />
          </div>
        </div>
      
      ) : (
        <Login 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          clearErrors={clearErrors}
          user={setUser}
      />
      )}
      
    </div>
  );
};

export default App;
