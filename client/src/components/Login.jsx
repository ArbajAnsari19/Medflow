import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data) {
        return window.alert("Unable to login");
      }

      if (!(data.message === "Login Successful")) {
        return window.alert(data.message);
      }

      localStorage.setItem("token", data.token);

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-1 bg-dark-gray/50   flex items-center justify-center">
      <div className="bg-soft-black p-6 rounded-md aspect-square border border-mid-gray">
        <p className="text-lg font-bold text-light-gray text-center my-5">
          LOGIN
        </p>
        <form
          action="submit"
          className="flex flex-col gap-2 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <button className="bg-dark-gray hover:bg-dark-gray/80 text-light-gray px-2 py-1 rounded-sm w-full my-5 ">
            Login
          </button>
        </form>
        <p className="text-light-gray text-sm text-center">
          No account? Signup{" "}
          <Link className="text-cyan-600" to="/signup">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
