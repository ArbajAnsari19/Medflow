import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import StoreManager from "./StoreManager";
import CEO from "./CEO";
import { Button, Card, Carousel, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import welcome from "../images/welcome.jpg";
import welcome2 from "../images/welcome2.jpg";
import welcome3 from "../images/welcome3.jpg";
import { useCart } from "../store/cart";

const Home = () => {
  const [userRole, setUserRole] = useState("");
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  const { add } = useCart();

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== null
    ) {
      const token = localStorage.getItem("token");
      const data = jwtDecode(token);
      setUserRole(data.role);
    }
  }, []);

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

        const inventories = await response.json();
        if (!inventories) {
          return window.alert(
            "Unable to fetch inventories, Internal servor error"
          );
        }

        setInventory(inventories.data.inventories);
      } catch (err) {
        console.log(err);
      }
    };

    getAllInventories();
  }, []);

  const contentStyle = {
    height: "300px",
    color: "#A9A9A9",
    alignitems: "center",
    lineHeight: "200px",
    textAlign: "center",
    background: "#121212",
    width: "100%",
  };

  const handleSearch = (e) => {
    if (e.target.value === "") setFilteredInventory(inventory);

    const newInv = inventory.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredInventory(newInv);
  };

  return (
    <div className="flex-1 bg-dark-gray/50 text-white flex justify-center items-center">
      {userRole === "CEO" && <CEO />}
      {userRole === "Store Manager" && <StoreManager />}
      {userRole === "User" && (
        <div className="bg-dark-gray p-6 aspect-square border-t border-mid-gray w-full flex flex-col gap-5">
          <Carousel className="rounded-lg" autoplay>
            <div>
              {/* <h3 style={contentStyle}>Welcome to MedFlow</h3> */}
              <img
                src={welcome}
                alt="Welcome to MedFlow"
                style={contentStyle}
              />
            </div>
            <div>
              {/* <h3 style={contentStyle}>MedFlow makes your orders seamless</h3> */}
              <img
                src={welcome2}
                alt="MedFlow makes your orders seamless"
                style={contentStyle}
              />
            </div>
            <div>
              {/* <h3 style={contentStyle}>Order your next medicines in seconds</h3> */}
              <img
                src={welcome3}
                alt="Unleash the power of Medflow"
                style={contentStyle}
              />
            </div>
          </Carousel>
          <div className="flex w-full items-center justify-end my-2">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search Meds"
              className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
            />
          </div>
          {/* <Row gutter={[16, 16]}>
            {inventory.map((item) => (
              <Col span={6}>
                <Card
                  key={item._id}
                  bordered={false}
                  hoverable
                  cover={
                    <img
                      alt="example"
                      style={{
                        height: "240px",
                        objectFit: "fill",
                        maxWidth: "100%",
                      }}
                      src={
                        item.image
                          ? item.image
                          : "https://www.shutterstock.com/image-photo/pharmaceuticals-antibiotics-pills-medicine-colorful-260nw-1061962874.jpg"
                      }
                    />
                  }
                >
                  <Meta
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{item.name}</div>
                        <div>
                          Price:{" "}
                          <b>
                            {item.price} {item.unit}
                          </b>
                        </div>
                      </div>
                    }
                    description={item.description}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Type: {item.type}</div>
                    <div>
                      Manufacturer: <b> {item.manufacturer}</b>
                    </div>
                  </div>
                  <br />
                  <Button type="primary">Add to Cart</Button>
                </Card>
              </Col>
            ))}
          </Row> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {!(filteredInventory.length > 0) &&
              inventory.map((item) => (
                <div
                  key={item._id}
                  className="bg-soft-black rounded-lg p-2 shadow shadow-mid-gray"
                >
                  <img
                    src={
                      item.image
                        ? item.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3MF01bNjQKXPkUrupPmdbXWAkpskK0BsrDCt8QZFMIg&s"
                    }
                    alt="imageLogo"
                    className="w-full aspect-video object-contain border-b border-mid-gray mb-2"
                  />
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
                    <span className="font-bold text-cyan-600">
                      Manufacturer:
                    </span>
                    <span className="text-light-gray">{item.manufacturer}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-cyan-600">Quantity:</span>
                    <span className="text-light-gray font-bold">
                      {item.quantity} remaining in stocks
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-cyan-600">Price:</span>
                    <span className="text-light-gray font-bold">
                      {item.price}
                    </span>
                    <span className="text-light-gray font-bold">
                      {item.unit}
                    </span>
                  </div>
                  <button
                    onClick={() => add(item)}
                    className="my-1 bg-light-gray text-soft-black hover:bg-light-gray/70 px-2 py-1 w-full rounded-md"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            {filteredInventory.length > 0 &&
              filteredInventory.map((item) => (
                <div
                  key={item._id}
                  className="bg-soft-black rounded-lg p-2 shadow shadow-mid-gray"
                >
                  <img
                    src={
                      item.image
                        ? item.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3MF01bNjQKXPkUrupPmdbXWAkpskK0BsrDCt8QZFMIg&s"
                    }
                    alt="imageLogo"
                    className="w-full aspect-video object-contain border-b border-mid-gray mb-2"
                  />
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
                    <span className="font-bold text-cyan-600">
                      Manufacturer:
                    </span>
                    <span className="text-light-gray">{item.manufacturer}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-cyan-600">Quantity:</span>
                    <span className="text-light-gray font-bold">
                      {item.quantity} remaining in stocks
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-cyan-600">Price:</span>
                    <span className="text-light-gray font-bold">
                      {item.price}
                    </span>
                    <span className="text-light-gray font-bold">
                      {item.unit}
                    </span>
                  </div>
                  <button
                    onClick={() => add(item)}
                    className="my-1 bg-light-gray text-soft-black hover:bg-light-gray/70 px-2 py-1 w-full rounded-md"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
