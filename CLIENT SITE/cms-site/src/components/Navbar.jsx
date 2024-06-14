import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="fixed w-full z-20 top-0 start-0 border-b shadow "
        style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
      >
        <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4">
          {" "}
          {/* Changed justify-between to justify-center */}
          <Link
            to="/"
            className="text-3xl font-semibold whitespace-nowrap style-script-regular dark:text-black"
          >
            DRAGON BALL
          </Link>
          <Link
            className="bg-gray-800 text-white font-semibold py-2 px-4 rounded m-3 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            to={"/planets"}
          >
            PLANETS DRAGON BALLS
          </Link>
          <button
            className="bg-gray-800 text-white font-semibold py-2 px-4 rounded m-3 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
          <Link to={"/"}>back</Link>
        </div>
      </nav>
    </>
  );
}
