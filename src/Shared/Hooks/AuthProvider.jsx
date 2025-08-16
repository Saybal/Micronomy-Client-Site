import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "./firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const createUser = (Email, password) => {
    return createUserWithEmailAndPassword(auth, Email, password);
  };

  const SignInUser = (Email, password) => {
    return signInWithEmailAndPassword(auth, Email, password);
  };

  const SignOutUser = () => {
    return signOut(auth);
  };

  const provider_google = new GoogleAuthProvider();
  const provider_facebook = new FacebookAuthProvider();

  const SignInGoogle = () => {
    return signInWithPopup(auth, provider_google);
  };

  const SignInFacebook = () => {
    return signInWithPopup(auth, provider_facebook);
  };

  const showdetails = () => {
    return data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    setData,
    data,
    createUser,
    SignInUser,
    SignOutUser,
    SignInGoogle,
    SignInFacebook,
    showdetails,
    loading,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
