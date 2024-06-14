import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetailPage() {
  const [dragonBall, setDragonBall] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const fetchDragonBalls = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dragonBalls/` + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      setDragonBall(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDragonBalls();
  }, []);
  return (
    <div className="  pl-52 pr-52">
      <div className="flex flex-col justify-center h-screen">
        <div className="text-left relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img
              src={dragonBall.image}
              alt="cuisine image"
              className="rounded-xl"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">
              <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                {dragonBall.name && dragonBall.name}
                {console.log(dragonBall)}
              </div>
            </div>
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
              {dragonBall.name}
            </h3>
            <p className="md:text-lg text-gray-500 text-base">
              {dragonBall.description}
            </p>
            <p className="text-xl font-black text-gray-800">
              Rp {dragonBall.ki}
            </p>
            <Link
              to="/"
              className="text-white hover:text-black shadow-xl bg-purple-600 hover:border-purple-600 duration-300 hover:border hover:bg-transparent rounded-3xl py-3 px-8 font-medium inline-block mr-4 mt-16"
            >
              {" "}
              Back{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
