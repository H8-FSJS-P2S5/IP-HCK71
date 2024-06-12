import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Gadget from "./pages/Gadget";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import FoxyTech from "./pages/FoxyTech";
import Cart from "./pages/Cart";
import data from "../../server/datas/gadgets.json";
import { CartProvider } from "./pages/CartContext";
import PaymentPage from "./pages/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Gadget />
      </>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/gadgets/:id",
    element: (
      <>
        <Navbar />
        <Detail />
      </>
    ),
  },
  {
    path: "/foxy-tech",
    element: (
      <>
        <Navbar />
        <FoxyTech gadgets={data} />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },
  {
    path: "/payment",
    element: (
      <>
        <Navbar />
        <PaymentPage />
      </>
    ),
  },
]);

export default function App() {
  return (
    <CartProvider>
      {" "}
      {/* Wrap the app with CartProvider */}
      <RouterProvider router={router} />
    </CartProvider>
  );
}
