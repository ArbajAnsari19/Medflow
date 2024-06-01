import React from "react";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token && token !== null;

  if (!isLoggedIn) {
    return (
      <div className="flex-1 bg-dark-gray/50 flex justify-center items-center space-y-2">
        <div className="bg-soft-black p-6 rounded-md border border-mid-gray">
          <p className="text-xl text-center my-2 font-bold text-cyan-600">
            Welcome to MedFlow!
          </p>
          <p className="text-xl text-center my-2 text-light-gray font-bold">
            Kindly login to visit our website
          </p>
          <p className="text-light-gray text-center my-2">
            Click here to{" "}
            <Link to="/login" className="text-cyan-600">
              login
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="text-cyan-600">
              Signup
            </Link>
          </p>
        </div>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
