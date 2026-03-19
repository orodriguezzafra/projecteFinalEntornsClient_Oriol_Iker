import { useState, useEffect } from 'react';
import Card from './components/Card';
import { getJugadores } from './services/api';

type Jugador = {
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getJugadores()
      .then((data: Jugador[]) => setJugadors(data))
      .catch((err: unknown) => console.error("Error cargando jugadores", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando jugadores...</p>;

  return (
    <div>
      <Card jugadors={jugadors} setJugadors={setJugadors} />
    </div>
  );
}

export default App;