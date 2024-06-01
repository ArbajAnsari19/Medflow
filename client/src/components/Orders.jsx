import React, { useEffect, useState } from "react";
import { useUser } from "../store/user-info";

const Orders = () => {
  const { user } = useUser((state) => state);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/v1/order/getOrders",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!result) {
        return window.alert("Unable to fetch orders");
      }

      const userOrders = result.filter((order) => order.user_id === user.id);
      setOrders(userOrders);
    };

    getOrders();
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Orders
      </p>
      {!orders.length > 0 && (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-light-gray text-lg">You do not have any orders</p>
        </div>
      )}
      {orders.length > 0 && (
        <div className="flex flex-col gap-2 py-4">
          {orders.map((order) => (
            <div className="flex items-center gap-1">
              <span className="text-light-gray font-bold underline">
                Order_id:
              </span>
              <span className="text-light-gray text-lg">{order._id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
