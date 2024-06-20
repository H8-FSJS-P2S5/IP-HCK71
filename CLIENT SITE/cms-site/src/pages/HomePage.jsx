import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Swal from "sweetalert2";
import LandingPage from "./LandingPage";
import Search from "../components/Search";

export default function HomePage() {
  const [dragonBalls, setDragonBalls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const fetchDragonBalls = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/dragonBalls`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data);
      setDragonBalls(response.data);
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchDragonBalls();
  }, [currentPage, search]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };
  return (
    <>
      <LandingPage />
      <div className="flex justify-center items-center">
        <div className="container  ">
          <div
            className="pr-24 pl-24 pt-0 pb-2  rounded-3xl shadow-xl "
            style={{
              backgroundImage: `url(
                "https://e7.pngegg.com/pngimages/204/169/png-clipart-paper-silver-blue-metal-texture-blue.png")`,
            }}
          >
            <div className="flex justify-between items-center mb-10">
              <img
                src="https://static.promediateknologi.id/crop/12x316:708x1148/0x0/webp/photo/p2/74/2024/03/15/09523fa9795fc74836989905c806a117-1911404551.jpg"
                style={{ height: "30rem" }}
              />

              <Search onSearch={handleSearch} />
            </div>

            <div className="grid grid-cols-5 gap-2 mb-10">
              {dragonBalls.map((dragonBall) => {
                return <Card dragonBall={dragonBall} />;
              })}
            </div>
            <div className="flex justify-center mt-4 mb-4 gap-3 ">
              <button
                className="join-item btn dark:bg-gray-100 dark:text-black dark:border-none"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button className="join-item btn dark:bg-gray-100 dark:text-black dark:border-none">
                Page {currentPage}
              </button>
              <button
                className="join-item btn dark:bg-gray-100 dark:text-black dark:border-none"
                onClick={handleNextPage}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
