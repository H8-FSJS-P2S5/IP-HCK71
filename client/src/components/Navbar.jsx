import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <section id="header">
        <a href="#">
          <img src="" className="logo" alt="" />
        </a>
        <div>
          <ul id="navbar">
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li>
              <Link className="nav-link" to="/foxy-tech">
                Foxy Tech
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/cart" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
