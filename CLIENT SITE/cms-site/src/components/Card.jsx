import { Link } from "react-router-dom";

export default function Card(props) {
  console.log(props, "iniiiiii");
  const { dragonBall } = props;
  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        style={{ border: "1px solid #e5e7eb", marginBottom: "1rem" }}
      >
        <img
          className="w-full"
          src={dragonBall.image}
          style={{ height: "30rem" }}
          alt={dragonBall.name}
        />
        <div className="px-6 py-4 bg-white">
          <div className="font-bold text-xl mb-2 lato-regular text-left dark:text-black">
            {dragonBall.name}
          </div>
          <div className="text-base mb-2 lato-regular text-left dark:text-black">
            {dragonBall.race}
          </div>
          <Link
            to={`detail/${dragonBall.id}`}
            className="text-black hover:text-black shadow-xl bg-black-200 hover:bg-green-200 duration-300 rounded-2xl py-3 px-3 font-medium inline-block mt-5"
          >
            Detail
          </Link>
          <Link
            to={`add/${dragonBall.id}`}
            className="text-black hover:text-black shadow-xl bg-black-200 hover:bg-green-200 duration-300 rounded-2xl py-3 px-3 font-medium inline-block mt-5"
          >
            Add
          </Link>
        </div>
      </div>
    </>
  );
}

// import { Link } from "react-router-dom";

// export default function Card(props) {
//   console.log(props, "iniiiiii");
//   const { dragonBall } = props;
//   return (
//     <>
//       <div style={{ border: "1px solid #e5e7eb", marginBottom: "1rem" }}>
//         <div className="bg-white">
//           <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//             <h2 className="sr-only">Products</h2>
//             <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//               <a href="#" className="group">
//                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
//                   <img
//                     src={dragonBall.image}
//                     alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
//                     style={{ height: "12rem", objectFit: "cover" }}
//                   />
//                 </div>
//                 <h1 className="mt-4 text-sm text-gray-700">
//                   {dragonBall.race}
//                 </h1>
//                 <p className="mt-1 text-lg font-medium text-gray-900">
//                   {dragonBall.name}
//                 </p>
//                 <h3 className="mt-1 text-lg font-medium text-gray-900">
//                   {dragonBall.ki}
//                 </h3>
//               </a>
//               <img
//                 src={dragonBall.image}
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               />
//               <p className="mt-1 text-lg font-medium text-gray-900">
//                 {dragonBall.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
