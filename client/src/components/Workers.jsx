import React, { useEffect, useState } from "react";

const Workers = () => {
  const [workers, setWorkers] = useState([{}]);

  useEffect(() => {
    const getAllUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/getUsers",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!result) {
        return window.alert("Unable to fetch all the workers");
      }

      const filteredUsers = result.data.users.filter(
        (worker) => worker.role === "Store Manager"
      );
      setWorkers(filteredUsers);
    };

    getAllUsers();
  }, []);

  return (
    <div className="w-full h-full">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Workers
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        {workers.length > 0 &&
          workers.map((worker) => (
            <div
              key={worker.id}
              className="bg-mid-gray text-light-gray p-2 rounded-md border border-dark-gray shadow-sm shadow-dark-gray"
            >
              <div className="flex items-center gap-1">
                <span className="text-cyan-600 font-bold">Name:</span>
                <span>{worker.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-cyan-600 font-bold">Email:</span>
                <span>{worker.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-cyan-600 font-bold">Contact Number:</span>
                <span>{worker.contactNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-cyan-600 font-bold">Role:</span>
                <span>{worker.role}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Workers;
