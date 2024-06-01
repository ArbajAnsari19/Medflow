import React, { useEffect, useState } from "react";
import { useAddItemModal } from "../store/toggle-modal";
import { X } from "lucide-react";

const AddItemModal = () => {
  const { toggleIsAddItemOpen } = useAddItemModal((state) => state);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("syrup");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [unit, setUnit] = useState("per pack");
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState("");

  const getAllStores = async () => {
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

      const stores = await response.json();

      if (!stores) {
        return window.alert("Unable to fetch stores, Internal servor error");
      }

      setStores(stores.data.stores);
    } catch (err) {
      console.log(err);
    }
  };
  // getAllStores();
  useEffect(() => {
    getAllStores();
    console.log(stores);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/inventory/createInventory`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            type,
            price,
            manufacturer,
            category,
            unit,
            quantity: qty,
            store_id: selectedStore,
            image: img,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
      if (!data) {
        return window.alert("Internal server error, unable to add store");
      }

      if (data.status === "success") {
        window.alert(`${name} Added Successfully!`);
        // setName("");
        // setAddress("");
        // setContactNumber("");
        toggleIsAddItemOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-black/70 absolute flex justify-center items-center">
      <div className="bg-mid-gray border border-soft-black rounded-lg relative">
        <button
          onClick={toggleIsAddItemOpen}
          className="absolute hover:text-rose-600 text-white right-1 top-1"
        >
          <X className="h-5 w-5" />
        </button>
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-2 items-center p-6"
        >
          <p className="font-bold text-soft-black text-xl">Add Item</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-light-gray text-soft-black focus:ring-0 focus:outline-0 p-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          >
            <option value="syrup" defaultChecked>
              Syrup
            </option>
            <option value="tablet">Tablet</option>
            <option value="capsule">Capsule</option>
          </select>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Quantity"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Unit"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            placeholder="Manufacturer"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Image URL"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <select
            type="text"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            placeholder="Store"
            className="w-full bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          >
            <option value="" disabled selected>
              Select a store
            </option>
            {stores &&
              stores?.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
          </select>
          <button
            className="bg-soft-black hover:bg-soft-black/60 px-2 py-1 rounded-md text-light-gray w-full"
            onClick={handleSubmit}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
