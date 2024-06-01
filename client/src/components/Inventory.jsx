import React, { useEffect, useState } from "react";
import { useAddItemModal } from "../store/toggle-modal";

const Inventory = () => {
  const { toggleIsAddItemOpen } = useAddItemModal((state) => state);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getAllInventories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/v1/inventory/getInventories",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        if (!result) {
          return window.alert(
            "Unable to fetch inventories, Internal servor error"
          );
        }

        setInventory(result.data.inventories);
      } catch (err) {
        console.log(err);
      }
    };

    getAllInventories();
  }, [inventory]);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-2 border-b border-light-gray font-bold flex items-center justify-between">
        <span className="text-2xl text-light-gray">Inventory</span>
        <button
          onClick={toggleIsAddItemOpen}
          className="bg-soft-black hover:bg-soft-black/60 px-2 py-1 rounded-md text-light-gray font-bold"
        >
          Add Item
        </button>
      </div>
      {!inventory.length > 0 && (
        <div className="w-full flex-1 text-lg flex justify-center items-center text-light-gray">
          Your inventory is empty
        </div>
      )}
      {inventory.length > 0 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 py-4 overflow-y-scroll hide-scrollbar">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="bg-mid-gray text-white p-2 rounded-md border border-dark-gray shadow-sm shadow-dark-gray"
            >
              <div className="flex gap-2 items-center">
                <span className="font-bold text-cyan-600">Name:</span>
                <span className="text-light-gray">{item.name}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold text-cyan-600">Desc:</span>
                <span className="text-light-gray">{item.description}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold text-cyan-600">Type:</span>
                <span className="text-light-gray">{item.type}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold text-cyan-600">Manufacturer:</span>
                <span className="text-light-gray">{item.manufacturer}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold text-cyan-600">Quantity:</span>
                <span className="text-light-gray font-bold">
                  {item.quantity}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold text-cyan-600">Price:</span>
                <span className="text-light-gray font-bold">{item.price}</span>
                <span className="text-light-gray font-bold">{item.unit}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold text-cyan-600">StoreId:</span>
                <span className="text-light-gray">{item.store_id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
