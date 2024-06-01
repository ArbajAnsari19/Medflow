import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (role === "Select") {
      window.alert("Select a valid role");
    }
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          contactNumber,
          role,
        }),
      });

      const data = await response.json();

      if (!data) {
        return window.alert("Unable to create an account");
      }

      if (!(data.message === "User created successfully")) {
        return window.alert(data.message);
      }

      localStorage.setItem("token", data.token);

      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 bg-dark-gray/50 flex justify-center items-center">
      <div className="bg-soft-black p-6 rounded-md aspect-square border border-mid-gray">
        <p className="text-lg font-bold text-light-gray text-center my-5">
          SIGNUP
        </p>
        <form
          action="submit"
          className="flex flex-col gap-2 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Contact Number"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <select
            name="role"
            onChange={(e) => setRole(e.target.value)}
            placeholder="Select role"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-1 py-1 rounded-sm text-sm w-full"
          >
            <option value="Select" defaultChecked>
              Select
            </option>
            <option value="CEO">CEO</option>
            <option value="Store Manager">Store Manager</option>
            <option value="User">User</option>
          </select>
          <button className="bg-dark-gray hover:bg-dark-gray/80 text-light-gray px-2 py-1 rounded-sm w-full my-5">
            Signup
          </button>
        </form>
        <p className="text-light-gray text-sm text-center">
          Already have an account? Login{" "}
          <Link className="text-cyan-600" to="/login">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
