import React, { createContext, useEffect, useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthUser, SignupProps } from "../types/Types";
import { auth } from "../lib/firebase";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  currentUser: AuthUser | null;
  setCurrentUser?: React.Dispatch<React.SetStateAction<null>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  signup: ({ auth, email, password }: SignupProps) => Promise<UserCredential>;
  login: ({ auth, email, password }: SignupProps) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  // sign up function
  function signup({ auth, email, password }: SignupProps) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //login function
  function login({ auth, email, password }: SignupProps) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //log out function
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user as AuthUser);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []); // empty array to prevent infinite loop

  const AuthValue: AuthContextType = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={AuthValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
