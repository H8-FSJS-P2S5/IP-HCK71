// import { Link } from "react-router-dom";

// export default function CardMc({ item, handleDelete }) {
//   const { mc } = item;
//   const deleteMc = () => {
//     handleDelete(item.id);
//     console.log(item.id);
//   };
//   return (
//     <>
//       <div
//         className="card d-flex  justify-content-center align-items-center text-center col-4 m-3 "
//         style={{ width: "18rem" }}
//       >
//         <img
//           className="card-img-top m-4"
//           src={item.image}
//           alt="Card image cap"
//           style={{ width: "50px", height: "50px" }}
//         />
//         <div className="card-body">
//           <h5 className="card-title">{item.name}</h5>
//           <div>
//             <p>{item.description}</p>
//             <p>{item.name}</p>
//           </div>

//           <p>{item.description}</p>
//           <Link to="/updateMc" className="btn btn-warning">
//             Update
//           </Link>
//           <br />
//           <Link className="btn btn-danger" onClick={deleteMc}>
//             Delete
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
