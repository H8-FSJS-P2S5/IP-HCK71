import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function HomePage() {
  const [dragonBalls, setDragonBalls] = useState(null);
  const fetchDragonBalls = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/dragonBalls`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(res.data);
      setDragonBalls(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDragonBalls();
  }, []);
  return (
    <>
      <section className="mt-5 container">
        <div className="row">
          {dragonBalls &&
            dragonBalls.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
        </div>
      </section>
    </>
  );
}
