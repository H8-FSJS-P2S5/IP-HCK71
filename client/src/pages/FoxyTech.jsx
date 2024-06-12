import React, { useState, useEffect } from "react";
import { openAI } from "../utils/openAiClient";

const FoxyTech = ({ gadgets }) => {
  const [selectedGadgets, setSelectedGadgets] = useState([]);
  const [comparisonResults, setComparisonResults] = useState(null);

  const handleCompare = async () => {
    const gadget1 = gadgets.find((gadget) => gadget.id === selectedGadgets[0]);
    const gadget2 = gadgets.find((gadget) => gadget.id === selectedGadgets[1]);

    try {
      const result = await openAI(gadget1.name, gadget2.name);
      setComparisonResults(result);
    } catch (error) {
      console.error("Error fetching data from OpenAI:", error);
    }
  };

  const toggleGadgetSelection = (id) => {
    setSelectedGadgets((prevState) =>
      prevState.includes(id)
        ? prevState.filter((gadgetId) => gadgetId !== id)
        : [...prevState, id]
    );
  };

  useEffect(() => {
    if (selectedGadgets.length === 2) {
      handleCompare();
    } else {
      setComparisonResults(null);
    }
  }, [selectedGadgets]);

  return (
    <div className="container my-5">
      <h2 className="text-center my-5">Compare Gadgets</h2>
      <div className="row row-cols-4 g-3">
        {gadgets.map((gadget) => (
          <div key={gadget.id} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{gadget.name}</h5>
                <p className="card-text">{gadget.description}</p>
                <button
                  className={`btn ${
                    selectedGadgets.includes(gadget.id)
                      ? "btn-danger"
                      : "btn-primary"
                  }`}
                  onClick={() => toggleGadgetSelection(gadget.id)}
                >
                  {selectedGadgets.includes(gadget.id) ? "Remove" : "Compare"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedGadgets.length === 2 && (
        <button className="btn btn-primary" onClick={handleCompare}>
          Compare Selected Gadgets
        </button>
      )}
      {comparisonResults && (
        <div className="comparison-table mt-5">
          <h3>Comparison Results</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>{gadgets[selectedGadgets[0]].name}</th>
                <th>{gadgets[selectedGadgets[1]].name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Description</td>
                <td>{comparisonResults.phone1.description}</td>
                <td>{comparisonResults.phone2.description}</td>
              </tr>
              {/* Add more comparison rows as needed */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoxyTech;
