import { useEffect } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Profile from "./components/Profile";

import { Routes, Route } from "react-router-dom";
import { useAddItemModal, useDeleteAccountModal } from "./store/toggle-modal";
import AddItemModal from "./components/AddItemModal";
import DeleteAccountModal from "./components/DeleteAccountModal";
import { useUser } from "./store/user-info";

function App() {
  const { setUser } = useUser((state) => state);
  const { isAddItemOpen } = useAddItemModal((state) => state);
  const { isDeleteAccountOpen } = useDeleteAccountModal((state) => state);
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== null
    ) {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);
  return (
    <div className="flex flex-col h-screen hide-scrollbar">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/u/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      {isAddItemOpen && <AddItemModal />}
      {isDeleteAccountOpen && <DeleteAccountModal />}
    </div>
  );
}

export default App;
