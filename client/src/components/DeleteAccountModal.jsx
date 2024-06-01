import React, { useState } from "react";
import { useDeleteAccountModal } from "../store/toggle-modal";
import { X } from "lucide-react";
import { useUser } from "../store/user-info";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = () => {
  const navigate = useNavigate();
  const { toggleIsDeleteOpen } = useDeleteAccountModal((state) => state);
  const { user } = useUser((state) => state);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/api/v1/auth/deleteUser/${user.id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!result) {
      return window.alert("Internal server error, unable to delete");
    }

    toggleIsDeleteOpen();
    window.alert("Account successfully deleted");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    if (e.target.value === "delete") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="w-full h-screen bg-black/70 absolute flex justify-center items-center">
      <div className="bg-mid-gray border border-soft-black rounded-lg relative">
        <button
          onClick={toggleIsDeleteOpen}
          className="absolute hover:text-rose-600 text-white right-1 top-1"
        >
          <X className="h-5 w-5" />
        </button>
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-2 items-center p-6"
        >
          <p className="font-bold text-soft-black text-xl">Delete Account</p>
          <p className="mt-2 text-sm text-soft-black">
            Enter "delete" below to confirm deletion
          </p>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 mb-2 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <button
            disabled={disabled}
            className="bg-rose-600 hover:bg-rose-600/70 px-2 py-1 rounded-md text-light-gray w-full disabled:cursor-not-allowed disabled:bg-rose-600/30"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
