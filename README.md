# Medicine E-Commerce Website

This is a full-stack medicine e-commerce website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project is built for the Techshila 2024 - Inter Bhawan Tech Competition organised by STC, IIT Roorkee. The website allows users to browse, search, and purchase medicines online as well as manage inventory and controls for the CEO and Store manager roles.

## Features

- User authentication (signup, login, logout)
- Three roles for authentication - "CEO", "Store manager" and "User"
- Product browsing and searching
- Shopping cart functionality
- Secure payment gateway integration
- Order history and tracking
- Admin dashboard for managing products and orders
- Adding and managing inventories
- Account management

## Technologies Used

- **Frontend**
  - React.js
  - Zustand (for state management)
  - React Router (for routing)
  - TailwindCSS (for styling)
  - Leaflet (for maps)
  - Lucide-react (for Icons)

- **Backend**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM)
  - Bcrypt (for password hashing)
  - Jsonwebtoken (JSON Web Tokens) for authentication
  - Razorpay API (for payment processing)
  - Crypto (for verifying signature)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed locally or a MongoDB Atlas account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/amratansh12/Techshila-2024.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Techshila-2024/client
    cd Techshila-2024/server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory:

    ```
    PORT=5000
    PRIVATE_KEY=your private key for signing jwt
    ```

### Running the Application

1. Start the backend server:

    ```bash
    cd server
    npm run dev
    ```

2. Start the frontend development server:

    ```bash
    cd client
    npm run start
    ```

3. The application will be running at `http://localhost:3000`.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

