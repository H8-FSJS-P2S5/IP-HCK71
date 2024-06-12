import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../pages/CartContext";
import axios from "axios";
import data from "../../../server/datas/gadgets.json";

function Detail() {
  const { id } = useParams();
  const { addToCart } = useCart(); // Get addToCart from context

  const [gadget, setGadget] = useState({});

  useEffect(() => {
    const gadgetData = data.find((gadget) => gadget.id === parseInt(id));
    if (gadgetData) {
      setGadget(gadgetData);
    } else {
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `https://localhost:5173/pub/gadgets/${id}`
      );
      setGadget(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container border border-warning rounded mt-3 p-3">
      <div>
        <h3 className="mb-5 text-center">{gadget.name}</h3>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <img
                src={gadget.imgUrl}
                style={{ width: "500px" }}
                className="mb-3"
              />
            </div>
            <div className="col">
              <h4>Description:</h4>
              <h5 className="mb-3">{gadget.description}</h5>
              <h4>Price:</h4>
              <h5 className="mb-3">{gadget.price}</h5>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(gadget)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
