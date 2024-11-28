import {
  Button,
  Col,
  Layout,
  Row,
  Space,
  Statistic,
  Table,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { CreditCard, Trash, User } from "lucide-react";
import { useCart } from "../store/cart";

const Cart = ({ remove, removeAll }) => {
  const { totalPrice, count, cart } = useCart();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "itemName",
    },
    {
      title: "Price",
      key: "itemPrice",
      dataIndex: "price",
      render: (text, record) => (
        <Space size="middle">
          <p>{text}</p>
        </Space>
      ),
    },
    {
      title: "Quantity",
      key: "itemQuantity",
      dataIndex: "count",
      render: (text, record) => (
        <Space size="middle">
          <p>{text}</p>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => remove(record.id)}
            icon={<Trash />}
            type="primary"
            shape="round"
            danger
          >
          </Button>
        </Space>
      ),
    },
  ];

  // const total = [0];

  // Payment logic
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Creating a new order
    const token = localStorage.getItem("token");
    const result = await fetch("https://medflow-ecru.vercel.app/?vercelToolbarCode=nRPbND5sXEB8LP2/api/v1/pay/orders", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!result.ok) {
      alert("Server error. Are you online?");
      return;
    }

    const data = await result.json();
    console.log(data);

    const { amount, id, currency } = data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Ensure this is correctly set
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: User,
      order_id: id,
      handler: async function (response) {
        const paymentData = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch("https://medflow-ecru.vercel.app/?vercelToolbarCode=nRPbND5sXEB8LP2/api/v1/pay/success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        });

        if (!result.ok) {
          alert("Payment verification failed. Please try again.");
          return;
        }

        const successmsg = await result.json();
        alert(successmsg.msg);
      },
      prefill: {
        name: "Ayush",
        email: "ayush@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Medflow Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="w-96">
      <Layout>
        <Content className="items-center">
          <Row justify="end">
            <Col className="items-center pt-4">
              <Button
                shape="round"
                type="primary"
                danger
                icon={<Trash />}
                style={{
                  marginTop: 16,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => removeAll()}
              >
                Empty Cart
              </Button>
            </Col>
          </Row>
          <span className="pb-4">
            Total Items <strong>({count()})</strong>
          </span>
          <Table
            columns={columns}
            dataSource={cart}
            pagination={false}
          />
          <Row justify="end">
            <Col>
              <Statistic
                title="Total (tax incl)."
                value={`₹ ${totalPrice()}`}
                precision={2}
              />
              <Button
                onClick={displayRazorpay}
                style={{
                  marginTop: 16,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                type="primary"
                icon={<CreditCard />}
              >
                Pay now
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default Cart;
