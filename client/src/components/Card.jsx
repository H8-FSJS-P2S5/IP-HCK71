import { Link } from "react-router-dom";

export default function Card({ gadget }) {
  return (
    <>
      <div className="col">
        <div className="card shadow" style={{ height: "350px" }}>
          <img
            src={gadget.imgUrl}
            className="card-img-top"
            alt=""
            style={{ height: "110px" }}
          />
          <div className="card-body">
            <p className="card-title text-center" style={{ fontSize: 16 }}>
              <strong>{gadget.name}</strong>
            </p>
            <p className="card-text text-center" style={{ fontSize: 12 }}>
              {gadget.description}
            </p>
          </div>
          <div className="mb-2 text-center">
            <p className="card-title text-center" style={{ fontSize: 16 }}>
              <strong>{gadget.price}</strong>
            </p>
            <Link
              to={`/gadgets/${gadget.id}`}
              className="btn btn-warning"
              style={{ width: 80 }}
            >
              Detail
            </Link>
            <p className="card-title text-center mt-2" style={{ fontSize: 16 }}>
              <strong>{gadget.Category}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
