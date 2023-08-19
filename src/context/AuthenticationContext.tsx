import React, { createContext, useEffect, useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {GoogleSignInProps, SignupProps } from "../types/Types";
import { auth } from "../lib/Firebase";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  currentUser: any;
  setCurrentUser?: React.Dispatch<React.SetStateAction<any>>;
  signup: ({ auth, email, password }: SignupProps) => Promise<UserCredential>;
  googleSignIn: ({ auth, provider }: GoogleSignInProps) => Promise<UserCredential>;
  login: ({ auth, email, password }: SignupProps) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null as unknown);

  // sign up function
  function signup({ auth, email, password }: SignupProps) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //login function
  function login({ auth, email, password }: SignupProps) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // google sign in function
  function googleSignIn({ auth, provider}: GoogleSignInProps) {
    return signInWithPopup(auth, provider)
  }

  //log out function
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("isUserLoggedIn", "true");
      } else {
        setCurrentUser(null);
        localStorage.removeItem("isUserLoggedIn");
      }
    });
    return unsubscribe;
  }, [currentUser]);

  //check if user is logged in for more than 3 seconds using setTimeOut, then log them out
  useEffect(() => {
    const oneDay = 1000 * 60 * 60 * 24;
    if (currentUser) {
      setTimeout(() => {
        signOut(auth);
      }, oneDay);
    }
  }, [currentUser]);

  const AuthValue: AuthContextType = {
    currentUser,
    signup,
    googleSignIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={AuthValue}>
      {children}
    </AuthContext.Provider>
  );
};
