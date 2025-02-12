"use client";

import { useState, useEffect } from "react";
import { auth, provider } from "./Firebase"; // Import Firebase
import { signInWithPopup, signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa"; // Professional user icon

const SignIn = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes (login/logout)
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state when auth state changes
    });

    return () => unsubscribe(); // Clean up listener when unmounted
  }, []);

  // Handle Sign-In
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  // Handle Sign-Out with confirmation
  const handleSignOut = async () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign-out error:", error);
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Conditionally render sign-in or sign-out button */}
      {user ? (
        <button
          className="flex items-center space-x-3 text-gray-300 hover:text-white transition p-2"
          onClick={handleSignOut}
        >
          <FaUserCircle className="w-8 h-8 text-gray-400" />
          <span className="text-sm">{user.displayName}</span>
        </button>
      ) : (
        <button
          className="flex items-center space-x-3 text-gray-300 hover:text-white transition p-2"
          onClick={handleSignIn}
        >
          <FaUserCircle className="w-8 h-8 text-gray-400" />
          <span className="text-sm">Sign In</span>
        </button>
      )}
    </div>
  );
};

export default SignIn;
