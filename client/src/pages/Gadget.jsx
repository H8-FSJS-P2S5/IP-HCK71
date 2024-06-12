import React, { useEffect, useState } from "react";
import data from "../../../server/datas/gadgets.json";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function HomePage({ changePage }) {
  const [gadgets, setGadgets] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("name");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const filteredData = data.filter((gadget) =>
      gadget.name.toLowerCase().includes(filter.toLowerCase())
    );
    const sortedData = filteredData.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "description") {
        return a.description.localeCompare(b.description);
      }
      return 0;
    });
    const slicedData = sortedData.slice(startIdx, endIdx);
    setGadgets(slicedData);
  }, [page, pageSize, sort, filter]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div className="container my-5">
        <div style={{ marginBottom: "5px" }}>
          <label htmlFor="pageSize" className="form-label">
            Gadgets Per Page
          </label>
          <select
            id="pageSize"
            className="form-select"
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ marginLeft: "5px" }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label htmlFor="sort" className="form-label">
            Sort
          </label>
          <select
            id="sort"
            className="form-select"
            value={sort}
            onChange={handleSortChange}
            style={{ width: "100px", marginLeft: "5px" }}
          >
            <option value="name">Name</option>
            <option value="description">Description</option>
          </select>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label htmlFor="filter" className="form-label">
            Filter
          </label>
          <input
            type="text"
            id="filter"
            className="form-control"
            value={filter}
            onChange={handleFilterChange}
            style={{ marginLeft: "5px" }}
          />
        </div>
        <div className="row row-cols-4 g-3">
          {gadgets.map((gadget) => (
            <div key={gadget.id} className="col">
              <Card gadget={gadget} />
              <Link
                to={`/gadgets/${gadget.id}`}
                className="btn btn-primary"
              ></Link>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" disabled>
                {page}
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
