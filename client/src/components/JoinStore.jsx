import React, { useEffect, useState } from "react";
import { useUser } from "../store/user-info";

const JoinStore = () => {
  const { user } = useUser((state) => state);
  const [storeId, setStoreId] = useState("");
  const [allStores, setAllStores] = useState([]);

  useEffect(() => {
    console.log(user.id);
    const getStores = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/v1/store/getStores",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!result) {
          return console.log("Unable to process store info");
        }
        setAllStores(result.data.stores);
      } catch (error) {
        console.log(error);
      }
    };

    getStores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/api/v1/store/updateStore/${storeId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    );

    const result = await response.json();

    if (!result || !result.status === "success") {
      return window.alert("Internal server error, Unable to join store");
    }

    console.log(result);
    window.alert("Store joined");
  };

  return (
    <div className="w-full h-full p-4">
      <p className="text-xl font-semibold text-center my-2 text-light-gray">
        Join a Store
      </p>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3"
      >
        <select
          type="text"
          onChange={(e) => setStoreId(e.target.value)}
          placeholder="Join Store"
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-1 py-1 rounded-sm text-sm w-[50%]"
        >
          <option value="Enter store id" defaultChecked>
            Select a store
          </option>
          {allStores.length > 0 &&
            allStores.map((storeItem) => (
              <option key={storeItem._id} value={storeItem._id} defaultChecked>
                {storeItem.name}
              </option>
            ))}
        </select>

        <button className="bg-mid-gray w-[50%] hover:bg-mid-gray/60 cursor-pointer px-2 rounded-md text-light-gray">
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinStore;
