import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../store/user-info";
import { useDeleteAccountModal } from "../store/toggle-modal";

const UpdateProfile = () => {
  const { user, setUser } = useUser((state) => state);
  const { toggleIsDeleteOpen } = useDeleteAccountModal((state) => state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/auth/updateUser/${user.id}`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            contactNumber,
          }),
        }
      );

      const data = await response.json();

      if (!data) {
        return window.alert("Internal server error, unable to update account");
      }

      if (!data.token) {
        return window.alert("Unable to update user");
      }

      localStorage.setItem("token", data.token);
      const updatedUser = jwtDecode(data.token);
      setUser(updatedUser);
      window.alert("User updated successfully");
      setName("");
      setEmail("");
      setContactNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Update Info
      </p>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-5 py-4 w-full md:w-[300px]"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <button className="bg-soft-black hover:bg-soft-black/70 text-light-gray cursor-pointer px-2 py-1 rounded-md">
          Update
        </button>
      </form>
      <div className="border-t border-light-gray py-2 flex gap-2 items-center">
        <p className="text-rose-600 text-sm">
          Deleting your account is an irreversible option. Kindly be certain
          before deleting your account.
        </p>
        <button
          className="bg-rose-600 hover:bg-rose-600/60 px-2 rounded-md text-dark-gray"
          onClick={toggleIsDeleteOpen}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
