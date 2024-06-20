import { Link } from "react-router-dom";
import img from "../assets/goku.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", {
        username: username,
        email: email,
        password: password,
      });
      navigate("/login");
      console.log(response);
    } catch (error) {
      Swal.fire({
        title: "Sorry!",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  async function handleCredentialResponse(response) {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: { google_token: response.credential },
      });
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data);
    }
  }

  function loadGoogleButton() {
    window.google.accounts.id.initialize({
      client_id:
        "147631135896-dmtidb62g15qv7o7t82vfdge48nb878g.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // window.google.accounts.id.prompt(); // also display the One Tap dialog
  }

  useEffect(() => {
    loadGoogleButton();
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <div className="flex-1">
          <img className="object-cover w-full h-full" src={img} alt="Goku" />
        </div>
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-25 w-25"
              src="https://images.tokopedia.net/img/cache/700/product-1/2020/1/16/52648384/52648384_84dd35b5-ce63-420f-9200-27c8de064459_800_800.jpg"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
            <div className="mt-6">
              <p className="text-center text-sm text-gray-500">
                Or continue with
              </p>
              <div className="mt-3 flex justify-center gap-3">
                {/* <a
                  href="#"
                  className="flex items-center justify-center w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.4 0 6.2 1.1 8.5 3.2l6.3-6.3C34.9 3.4 29.8 1 24 1 14.7 1 7 6.7 3.4 14.9l7.8 6.2C12.7 14.1 17.9 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M24 47c6.5 0 12-2.2 16.5-5.9l-7.8-6.3c-2.4 1.6-5.5 2.5-8.7 2.5-6.6 0-12.2-4.4-14.2-10.4l-7.9 6.1C7 41.9 14.8 47 24 47z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M47.6 24.3c0-1.6-.1-3.1-.4-4.6H24v9.1h13.4c-.6 3-2.5 5.6-5.4 7.3l7.8 6.3C44.7 38.1 47.6 31.6 47.6 24.3z"
                    />
                    <path
                      fill="#34A853"
                      d="M9.6 28.3C8.7 25.9 8.7 23 9.6 20.6l-7.8-6.2C.7 18.1 0 21 0 24s.7 5.9 1.8 8.6l7.8-6.3z"
                    />
                  </svg>
                  Google
                </a> */}
                <div id="buttonDiv"></div>
                <a
                  href="#"
                  className="flex items-center justify-center w-full rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>GitHub</title>
                    <path
                      fill="currentColor"
                      d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.77-.25.77-.55 0-.27-.01-.97-.02-1.9-3.19.69-3.86-1.36-3.86-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.72 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.18A11.015 11.015 0 0112 6.84c.98.01 1.97.13 2.9.38 2.18-1.5 3.15-1.18 3.15-1.18.62 1.58.23 2.74.11 3.03.73.81 1.18 1.84 1.18 3.1 0 4.45-2.69 5.43-5.25 5.71.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.2.66.78.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"
                    />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
