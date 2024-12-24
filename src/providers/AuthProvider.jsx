import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { auth } from "../firebase/firebase.config";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authInfo = {
    user,
    loading,
    setLoading,
    userLogin,
    userRegister,
    userLogout,
    userProfileUpdate,
    googleAuthentication,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("https://tastr-server.vercel.app/api/jwt", user, {
            withCredentials: true,
          })
          .then(() => {})
          .catch((error) => console.log(error));
        setLoading(false);
      } else {
        axios
          .post(
            "https://tastr-server.vercel.app/api/jwt/logout",
            {},
            { withCredentials: true }
          )
          .then(() => {})
          .catch((error) => console.log(error));
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function userLogin(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function userRegister(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function userProfileUpdate(info) {
    return updateProfile(auth.currentUser, info);
  }

  function userLogout() {
    setLoading(true);
    return signOut(auth);
  }

  function googleAuthentication() {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
