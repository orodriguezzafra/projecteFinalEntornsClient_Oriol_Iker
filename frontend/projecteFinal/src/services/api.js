
const API_URL = "http://localhost:4000/api"; 



// Obtener todos los jugadores

export async function getJugadores() {
  try {
    const response = await fetch(`${API_URL}/players`);
    if (!response.ok) {
      throw new Error("Error al obtener jugadores");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getJugadores:", error);
    throw error;
  }
}


// Crear un nuevo jugador
 
export async function createJugador(jugador) {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jugador),
    });

    if (!response.ok) {
      throw new Error("Error al crear jugador");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en createJugador:", error);
    throw error;
  }
}

// Actualizar un jugador existente

export async function updateJugador(id, jugador) {
  try {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jugador),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar jugador");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateJugador:", error);
    throw error;
  }
}


// Eliminar un jugador
 
export async function deleteJugador(id) {
  try {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar jugador");
    }
    if (response.status === 204) return true;
    return await response.json();
  } catch (error) {
    console.error("Error en deleteJugador:", error);
    throw error;
  }
}
