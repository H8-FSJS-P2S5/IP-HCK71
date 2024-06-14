import { Link } from "react-router-dom";

export default function CardPlanets(props) {
  console.log(props, "iniiiiii");
  //   const { dragonBall } = props;
  //   console.log(dragonBall);
  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        style={{ border: "1px solid #e5e7eb", marginBottom: "1rem" }}
      >
        <img
          className="w-full"
          src={props.planet.image}
          style={{ height: "30rem" }}
          alt={props.planet.name}
        />
        <div className="px-6 py-4 bg-white">
          <div className="font-bold text-xl mb-2 lato-regular text-left dark:text-black">
            {props.planet.name}
          </div>
          <div className="text-base mb-2 lato-regular text-left dark:text-black">
            {props.planet.race}
          </div>
          <Link
            to={`detail/${props.planet.id}`}
            className="text-black hover:text-black shadow-xl bg-black-200 hover:bg-green-200 duration-300 rounded-2xl py-3 px-3 font-medium inline-block mt-5"
          >
            Detail
          </Link>
          <Link
            to={`add/${props.planet.id}`}
            className="text-black hover:text-black shadow-xl bg-black-200 hover:bg-green-200 duration-300 rounded-2xl py-3 px-3 font-medium inline-block mt-5"
          >
            Add
          </Link>
        </div>
      </div>
    </>
  );
}
