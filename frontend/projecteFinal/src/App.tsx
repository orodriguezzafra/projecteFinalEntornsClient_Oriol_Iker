import { useState, useEffect } from "react";
import Card from "./components/Card";
import { getJugadores } from "./services/api";

export type Jugador = {
  _id: string;
  name: string;
  number: number;
  position: string;
  isInjured: boolean;
  birthDate: string;
  contractEnd: string;
  teams: string[];
  image: string;
  description: string;
};

function App() {
  const [jugadors, setJugadors] = useState<Jugador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJugadores()
      .then(setJugadors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando jugadores...</p>;

  return <Card jugadors={jugadors} setJugadors={setJugadors} />;
}

export default App;