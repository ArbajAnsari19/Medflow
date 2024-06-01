import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../store/user-info";
import LocationSelectorMap from "./StoreLocation/LocationSelector";

const AddStore = () => {
  const { user, setUser } = useUser((state) => state);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [coord, setCoord] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/store/createStore`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            address,
            location: coord,
            contactNumber,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
      if (!data) {
        return window.alert("Internal server error, unable to add store");
      }

      if (data.status === "success") {
        window.alert("Store Added Successfully!");
        setName("");
        setAddress("");
        setContactNumber("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationSelected = async (latlng) => {
    console.log(latlng); // { lat: 51.505, lng: -0.09 }
    setCoord([latlng.lat, latlng.lng]);
  };

  return (
    <div className="w-full h-full">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Add Store
      </p>
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <form
          action="submit"
          className="flex flex-col gap-5 py-4 w-full md:w-[300px]"
        >
          <input
            type="text"
            placeholder="Store Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            placeholder="Store Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Store Contact Number"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-soft-black hover:bg-soft-black/70 text-light-gray cursor-pointer px-2 py-1 rounded-md"
          >
            Add Store
          </button>
        </form>
        <div className="w-full py-4">
          <p className="text-light-gray">Select Store location</p>
          <LocationSelectorMap
            onLocationSelected={handleLocationSelected}
            DEFAULT_POSITION={[29.854263, 77.888]}
            styles={"w-full h-[400px]"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStore;
