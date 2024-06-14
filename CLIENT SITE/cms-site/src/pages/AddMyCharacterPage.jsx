// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import CardMc from "../components/CardMc";

// export default function AddMyCharacterPage() {
//   const [mc, setMc] = useState([]);
//   const fetchMc = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/mc`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//       });
//       console.log(res.data);
//       setMc(res.data);
//     } catch (error) {
//       console.log(error.response);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(`http://localhost:3000/mc/` + id, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//       });
//       // console.log(res.data.data);
//       fetchMc();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchMc();
//   }, []);
//   return (
//     <>
//       <section className="mt-5 container">
//         <div className="container">
//           <div className="row">
//             <div className="grid grid-cols-5 gap-2 mb-10">
//               {mc.map((mc) => {
//                 return <CardMc mc={mc} handleDelete={handleDelete} />;
//               })}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import CardMc from "../components/CardMc";

// // export default function AddMyCharacterPage() {
// //   const [mc, setMc] = useState([]);

// //   const fetchMc = async () => {
// //     try {
// //       const res = await axios.get(`http://localhost:3000/mc`, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
// //         },
// //       });
// //       setMc(res.data);
// //     } catch (error) {
// //       console.log(error.response);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:3000/mc/${id}`, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
// //         },
// //       });
// //       fetchMc(); // Refresh the list after deletion
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMc(); // Fetch characters on component mount
// //   }, []);

// //   return (
// //     <section className="mt-5 container">
// //       <div className="row">
// //         {mc.map((item) => (
// //           <CardMc key={item.id} item={item} handleDelete={handleDelete} />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }
