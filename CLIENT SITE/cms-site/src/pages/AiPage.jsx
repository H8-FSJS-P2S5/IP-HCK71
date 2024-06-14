import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AiPage = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log({ question, setQuestion });

    setIsLoading(true); // Start loading
    setError(""); // Reset error state

    try {
      const { data } = await axios.post("http://localhost:3000/ai", {
        question,
      });
      console.log(data);
      setAnswer(data.answer);
    } catch (error) {
      setError(error.response.data.message); // Set error message
      Swal.fire({
        title: "Sorry!",
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const backgroundStyle = {
    backgroundImage: `url('https://wallpapercave.com/wp/wp5437027.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={backgroundStyle}
    >
      <div className="w-full max-w-lg p-8 bg-black bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-center text-4xl font-cursive mb-8 text-white">
          Everything You Wanna Know
        </h1>
        <form className="space-y-6" onSubmit={handleOnSubmit}>
          <div>
            <label
              htmlFor="inputquestion"
              className="text-white text-sm font-medium"
            >
              Question
            </label>
            <input
              type="text"
              id="inputquestion"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Ask
            </button>
          </div>
        </form>
        {isLoading && (
          <div className="flex justify-center mt-4">
            <img
              src="https://i.gifer.com/ZZ5H.gif"
              alt="Loading..."
              className="w-12 h-12"
            />
          </div>
        )}
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}
        {answer && <p className="mt-4 text-gray-300">Answer: {answer}</p>}
      </div>
    </div>
  );
};
