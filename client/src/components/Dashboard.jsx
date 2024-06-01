import React from "react";
import { useUser } from "../store/user-info";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser((state) => state);
  const { name, email, role, contactNumber } = user;

  const handleClick = (target) => {
    navigate(`/u/${name}/${target}`);
  };

  return (
    <div className="w-full h-full">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Dashboard
      </p>
      <div className="mt-2 py-3 border-b border-light-gray">
        <p className="text-light-gray my-3 text-xl">
          <span className="font-bold mr-2 text-cyan-600">Name:</span>
          <span>{name}</span>
        </p>
        <p className="text-light-gray my-3 text-xl">
          <span className="font-bold mr-2 text-cyan-600">Email:</span>
          <span>{email}</span>
        </p>
        {
          role !== "User" ? ( <p className="text-light-gray my-3 text-xl">
          <span className="font-bold mr-2 text-cyan-600">Role:</span>
          <span>{role}</span>
        </p>): (null)
        }
       
        <p className="text-light-gray my-3 text-xl">
          <span className="font-bold mr-2 text-cyan-600">Contact Number:</span>
          <span>{contactNumber}</span>
        </p>
      </div>
      {/* <UpdateProfile /> */}
    </div>
  );
};

export default Dashboard;
