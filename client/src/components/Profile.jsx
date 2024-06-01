import React, { useEffect, useState } from "react";
import {
  SquareMenu,
  UsersRound,
  ShoppingCart,
  ListOrdered,
  LineChart,
  LocateFixed,
  LogOut,
  UserRoundCog,
  StoreIcon,
  Plus,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../store/user-info";
import Dashboard from "./Dashboard";
import Workers from "./Workers";
import Inventory from "./Inventory";
import Orders from "./Orders";
import OrderStatus from "./OrderStatus";
import UpdateProfile from "./UpdateProfile";
import AddStore from "./AddStore";
import ViewStore from "./Stores";
import InventoryByStore from "./inventoryByStore";

const sidebarOptions = [
  {
    type: "CEO",
    list: [
      { label: "Dashboard", Icon: <SquareMenu className="h-4 w-4" /> },
      { label: "Workers", Icon: <UsersRound className="h-4 w-4" /> },
      { label: "Inventory", Icon: <ShoppingCart className="h-4 w-4" /> },
      { label: "Add Store", Icon: <Plus className="h-4 w-4" /> },
      { label: "Stores", Icon: <StoreIcon className="h-4 w-4" /> },
    ],
  },
  {
    type: "Store Manager",
    list: [
      { label: "Dashboard", Icon: <SquareMenu className="h-4 w-4" /> },
      { label: "Inventory", Icon: <ShoppingCart className="h-4 w-4" /> },
      { label: "Orders", Icon: <ListOrdered className="h-4 w-4" /> },
      { label: "Order Status", Icon: <LineChart className="h-4 w-4" /> },
    ],
  },
  {
    type: "User",
    list: [
      { label: "Dashboard", Icon: <SquareMenu className="h-4 w-4" /> },
      { label: "Orders", Icon: <ListOrdered className="h-4 w-4" /> },
      { label: "Order Status", Icon: <LineChart className="h-4 w-4" /> },
      { label: "Nearest stores", Icon: <LocateFixed className="h-4 w-4" /> },
    ],
  },
];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const { user, setUser } = useUser((state) => state);
  const [component, setComponent] = useState("");
  let str = location.pathname.split("/")[2];
  if (str !== undefined) {
    str = str.replace(/%20/g, " ");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      if (token && token !== null) {
        const data = jwtDecode(token);
        setUser(data);
        const filteredOptions = sidebarOptions.filter(
          (item) => item.type === data.role
        );
        setOptions(filteredOptions[0].list);
      }
    }
  }, [setUser]);

  useEffect(() => {
    setComponent(location.pathname.split("/")[3]);
  }, [location, component]);

  const listComponent = () => {
    if (user.role === "CEO") {
      switch (component) {
        case "Dashboard":
          return <Dashboard />;
        case "Workers":
          return <Workers />;
        case "Inventory":
          return <Inventory />;
        case "Add%20Store":
          return <AddStore />;
        case "Stores":
          return <ViewStore />;
        case "settings":
          return <UpdateProfile />;
        case "deep":
          return (
            <InventoryByStore
              storeId={location.pathname.split("/")[4]}
              storeName={str}
            />
          );
        default:
          return;
      }
    }

    if (user.role === "User") {
      switch (component) {
        case "Dashboard":
          return <Dashboard />;
        case "Orders":
          return <Orders />;
        case "Order%20Status":
          return <OrderStatus />;
        case "Nearest%20stores":
          return <ViewStore />;
        case "settings":
          return <UpdateProfile />;
        default:
          return;
      }
    }

    if (user.role === "Store Manager") {
      switch (component) {
        case "Dashboard":
          return <Dashboard />;
        case "Inventory":
          return <Inventory />;
        case "Orders":
          return <Orders />;
        case "Order%20Status":
          return <OrderStatus />;
        case "settings":
          return <UpdateProfile />;
        default:
          return;
      }
    }
  };

  return (
    <div className="flex-1 bg-dark-gray/50 flex">
      <div className="bg-soft-black w-[60px] md:w-[200px] h-full text-light-gray flex flex-col border-t border-dark-gray">
        <div className="flex flex-col gap-4 mt-4 w-full">
          {options.map((option) => (
            <div
              key={option.label}
              onClick={() => navigate(`/u/${user.name}/${option.label}`)}
              className="hover:bg-dark-gray cursor-pointer flex gap-1 items-center justify-center md:justify-start px-3 py-2 w-full"
            >
              {option.Icon}
              <p className="text-light-gray text-md hidden md:block">
                {option.label}
              </p>
            </div>
          ))}

          <div
            onClick={() => navigate(`/u/${user.name}/settings`)}
            className="hover:bg-dark-gray cursor-pointer flex gap-1 items-center justify-center md:justify-start px-3 py-2 w-full"
          >
            <UserRoundCog className="h-5 w-5 text-cyan-500" />
            <p className="text-cyan-500 text-md hidden md:block">Account</p>
          </div>
          <div
            onClick={handleLogout}
            className="hover:bg-dark-gray cursor-pointer flex gap-1 items-center justify-center md:justify-start px-3 py-2 w-full"
          >
            <LogOut className="h-5 w-5 text-rose-500" />
            <p className="text-rose-500 text-md hidden md:block">Logout</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 w-full h-full bg-dark-gray">
        {listComponent()}
      </div>
    </div>
  );
};

export default Profile;
