import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import Lottie from "lottie-web";
import jlottieAnimation from "../assets/Animation - 1718200536005.json";

export default function LandingPage() {
  useEffect(() => {
    const animationContainer = document.getElementById("jlottie-container");
    animationContainer.innerHTML = "";

    Lottie.loadAnimation({
      container: animationContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: jlottieAnimation,
    });
  }, []);
  return (
    <>
      <section className="flex justify-between items-center">
        {" "}
        <div className="text-black ml-8 mt-32 mb-32 leading-normal max-w-lg text-left">
          <h1 className="text-6xl mb-6 playfair-display-regular ">Heros</h1>
          <p>BIG HEROES</p>

          <Link
            to="/ai"
            className="shadow-xl bg-blue-600 hover:border-blue-600 duration-300 hover:border hover:bg-transparent rounded-3xl py-3 px-8 font-medium inline-block mr-4 mt-5"
          >
            Browse now!
          </Link>
        </div>
        <div
          className="mr-20 mt-20 mb-28"
          id="jlottie-container"
          style={{ width: 300, height: 300 }}
        >
          {/* This div will be used to render the jlottie animation */}
        </div>
      </section>
    </>
  );
}
