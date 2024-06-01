import React from "react";
import JoinStore from "./JoinStore";

const StoreManager = () => {
  return (
    <div className="bg-soft-black rounded-lg border border-mid-gray flex flex-col justify-center items-center p-4">
      <p className="text-cyan-600 text-center">
        Please check your profile to accesss information about your workers and
        inventory
      </p>
      <JoinStore />
    </div>
  );
};

export default StoreManager;
