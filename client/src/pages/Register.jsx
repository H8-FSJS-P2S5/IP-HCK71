import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ email, password }, "setelah submit register");

    try {
      await axios.post("https://phase2-aio.vercel.app/apis/register", {
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        title: "Sorry!",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };

  return (
    <div
      className="wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        action=""
        className="form-container"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
          color: "#fff",
        }}
      >
        <h1 style={{ color: "#ff8c00" }}>Register</h1>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            autoComplete="off"
            id="exampleInputEmail"
            required=""
          />
          <i className="bx bxs-envelope" />
        </div>
        <div className="input-box">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="off"
            required=""
          />
          <i className="bx bxs-lock-alt" />
        </div>
        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#ff8c00" }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
