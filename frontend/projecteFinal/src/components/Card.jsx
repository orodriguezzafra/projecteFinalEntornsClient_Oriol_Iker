import { useState } from "react";
import {
  updateJugador,
  deleteJugador,
  createJugador,
} from "../services/api.js";
import Button from "./Button";
import Input from "./Input";
import Badge from "./Badge";

const VALID_POSITIONS = [
  "GK",
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CM",
  "CAM",
  "LM",
  "RM",
  "ST",
  "CF",
  "LW",
  "RW",
];

function Card({ jugadors, setJugadors }) {
  const [selectedJugador, setSelectedJugador] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  return (
    <>
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container d-flex justify-content-between">
          <span className="navbar-brand mb-0 h1 fw-bold">Jugadors</span>
        </div>
      </nav>
      <div className="container mt-4">
        <Button
          clase="btn btn-success mb-4"
          onClick={() =>
            setSelectedJugador({
              name: "",
              number: "",
              position: "",
              isInjured: false,
              birthDate: "",
              contractEnd: "",
              teams: "",
              image: "",
              description: "",
              editMode: true,
              isNew: true,
            })
          }
        >
          Afegir Jugador
        </Button>

        <div className="row">
          {jugadors.map((jugador) => (
            <div key={jugador._id} className="col-12 mb-3">
              <div
                className="card bg-dark text-white shadow-sm border-secondary"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setSelectedJugador({ ...jugador, editMode: false })
                }
              >
                <div className="row g-0">
                  <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <img
                      src={jugador.image}
                      alt={jugador.name}
                      className="img-fluid player-img p-3"
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h2 className="card-title text-info">{jugador.name}</h2>
                      <p className="mb-2 text-white">
                        <strong>Dorsal:</strong> {jugador.number}
                      </p>
                      <p className="mb-2 text-white">
                        <strong>Posició:</strong> {jugador.position}
                      </p>
                      <p className="mb-2">
                        <strong>Lesionat:</strong>
                        <Badge
                          clase={
                            jugador.isInjured
                              ? "text-danger ms-2"
                              : "text-success ms-2"
                          }
                        >
                          {jugador.isInjured ? "Sí" : "No"}
                        </Badge>
                      </p>
                      <p className="mb-2 text-white-50">
                        <strong>Data de naixement:</strong>{" "}
                        {new Date(jugador.birthDate).toLocaleDateString("ca-ES")}
                      </p>
                      <p className="mb-2 text-white-50">
                        <strong>Fi de contracte:</strong>{" "}
                        {new Date(jugador.contractEnd).toLocaleDateString(
                          "ca-ES"
                        )}
                      </p>
                      <p className="mb-0 text-white-50">
                        <strong>Equips:</strong>{" "}
                        {jugador.teams.join(", ") || "Cap equip registrat"}
                      </p>

                      <div className="mt-3">
                        <Button
                          clase="btn btn-sm btn-warning me-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJugador({
                              ...jugador,
                              editMode: true,
                              teams: jugador.teams?.join(", ") || "",
                              birthDate: jugador.birthDate
                                ? new Date(jugador.birthDate)
                                    .toISOString()
                                    .split("T")[0]
                                : "",
                              contractEnd: jugador.contractEnd
                                ? new Date(jugador.contractEnd)
                                    .toISOString()
                                    .split("T")[0]
                                : "",
                            });
                          }}
                        >
                          Editar
                        </Button>

                        <Button
                          clase="btn btn-sm btn-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete(jugador);
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedJugador && (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.85)",
              zIndex: 1000,
            }}
            onClick={() => setSelectedJugador(null)}
          >
            <div
              className="card bg-dark text-white border-info p-4 shadow-lg"
              style={{
                maxWidth: "550px",
                width: "90%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedJugador.editMode ? (
                <>
                  <h3 className="text-info mb-3">
                    {selectedJugador.isNew
                      ? "Afegir jugador"
                      : "Editar jugador"}
                  </h3>

                  <h5 className="mb-2">Nom *</h5>
                  <Input
                    clase="form-control mb-3"
                    value={selectedJugador.name ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        name: e.target.value,
                      })
                    }
                    required
                  />

                  <h5 className="mb-2">Dorsal * (1-99)</h5>
                  <Input
                    clase="form-control mb-3"
                    type="number"
                    min="1"
                    max="99"
                    value={selectedJugador.number ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        number: e.target.value,
                      })
                    }
                    required
                  />

                  <h5 className="mb-2">Posició *</h5>
                  <select
                    className="form-control mb-3"
                    value={selectedJugador.position ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        position: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Selecciona una posició</option>
                    {VALID_POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>

                  <h5 className="mb-2">Lesionat</h5>
                  <select
                    className="form-control mb-3"
                    value={selectedJugador.isInjured ? "true" : "false"}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        isInjured: e.target.value === "true",
                      })
                    }
                  >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>

                  <h5 className="mb-2">Data de naixement *</h5>
                  <Input
                    clase="form-control mb-3"
                    type="date"
                    value={selectedJugador.birthDate ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        birthDate: e.target.value,
                      })
                    }
                    required
                  />

                  <h5 className="mb-2">Fi de contracte *</h5>
                  <Input
                    clase="form-control mb-3"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedJugador.contractEnd ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        contractEnd: e.target.value,
                      })
                    }
                    required
                  />

                  <h5 className="mb-2">Equips * (separats per comes)</h5>
                  <Input
                    clase="form-control mb-3"
                    placeholder="FC Barcelona, Valencia CF, ..."
                    value={selectedJugador.teams ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        teams: e.target.value,
                      })
                    }
                    required
                  />

                  <h5 className="mb-2">Imatge (URL) *</h5>
                  <Input
                    clase="form-control mb-3"
                    placeholder="https://example.com/image.jpg"
                    value={selectedJugador.image ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        image: e.target.value,
                      })
                    }
                    required
                  />

                  <h5 className="mb-2">Descripció * (min 10 caràcters)</h5>
                  <textarea
                    className="form-control mb-3"
                    rows="4"
                    minLength="10"
                    maxLength="2000"
                    value={selectedJugador.description ?? ""}
                    onChange={(e) =>
                      setSelectedJugador({
                        ...selectedJugador,
                        description: e.target.value,
                      })
                    }
                    required
                  />

                  <Button
                    clase="btn btn-success w-100 mb-2"
                    onClick={async () => {
                      try {
                        if (!selectedJugador.name?.trim()) {
                          alert("El nom és obligatori");
                          return;
                        }
                        if (!selectedJugador.number) {
                          alert("El dorsal és obligatori");
                          return;
                        }
                        if (!selectedJugador.position) {
                          alert("La posició és obligatòria");
                          return;
                        }
                        if (!selectedJugador.birthDate) {
                          alert("La data de naixement és obligatòria");
                          return;
                        }
                        if (!selectedJugador.contractEnd) {
                          alert("La data de fi de contracte és obligatòria");
                          return;
                        }
                        if (!selectedJugador.teams?.trim()) {
                          alert("Ha de tenir almenys un equip");
                          return;
                        }
                        if (!selectedJugador.image?.trim()) {
                          alert("La imatge és obligatòria");
                          return;
                        }
                        if (!selectedJugador.image.startsWith("http")) {
                          alert("URL d'imatge no vàlida");
                          return;
                        }
                        if (
                          !selectedJugador.description?.trim() ||
                          selectedJugador.description.trim().length < 10
                        ) {
                          alert(
                            "La descripció és obligatòria (mínim 10 caràcters)"
                          );
                          return;
                        }

                        const updated = {
                          ...selectedJugador,
                          teams: selectedJugador.teams
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                          number: Number(selectedJugador.number || 0),
                        };

                        let saved;

                        if (selectedJugador.isNew) {
                          const newJugador = {
                            name: updated.name.trim(),
                            number: updated.number,
                            position: updated.position,
                            isInjured: updated.isInjured,
                            birthDate: updated.birthDate,
                            contractEnd: updated.contractEnd,
                            teams: updated.teams,
                            image: updated.image.trim(),
                            description: updated.description.trim(),
                          };

                          saved = await createJugador(newJugador);
                          setJugadors((prev) => [...prev, saved]);
                        } else {
                          saved = await updateJugador(
                            selectedJugador._id,
                            updated
                          );
                          setJugadors((prev) =>
                            prev.map((j) =>
                              j._id === selectedJugador._id ? saved : j
                            )
                          );
                        }

                        setSelectedJugador(null);
                      } catch (error) {
                        console.error("Error guardant jugador:", error);
                        alert(
                          "Error al guardar el jugador: " +
                            (error.message || "Error desconegut")
                        );
                      }
                    }}
                  >
                    Guardar canvis
                  </Button>

                  <Button
                    clase="btn btn-outline-info w-100"
                    onClick={() => setSelectedJugador(null)}
                  >
                    Cancel·lar
                  </Button>
                </>
              ) : (
                <>
                  <div className="d-flex flex-column align-items-center mb-4">
                    <img
                      src={selectedJugador.image}
                      alt={selectedJugador.name}
                      style={{ width: "120px", height: "120px" }}
                      className="rounded-circle player-img-lg mb-3 p-2 bg-secondary"
                    />
                    <div className="text-center">
                      <h2 className="text-info mb-0">{selectedJugador.name}</h2>
                      <p className="text-warning mb-0">
                        Dorsal: #{selectedJugador.number} |{" "}
                        {selectedJugador.position}
                      </p>
                      <Badge
                        clase={
                          selectedJugador.isInjured
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {selectedJugador.isInjured
                          ? "⚠️ Lesionat"
                          : "✅ Disponible"}
                      </Badge>
                    </div>
                  </div>

                  <h6 className="text-info">Descripció</h6>
                  <p className="text-white-50 mb-3">
                    {selectedJugador.description}
                  </p>

                  <h6 className="text-info">Data de naixement</h6>
                  <p className="text-white-50 mb-3">
                    {new Date(selectedJugador.birthDate).toLocaleDateString(
                      "ca-ES"
                    )}
                  </p>

                  <h6 className="text-info">Fi de contracte</h6>
                  <p className="text-white-50 mb-3">
                    {new Date(selectedJugador.contractEnd).toLocaleDateString(
                      "ca-ES"
                    )}
                  </p>

                  <h6 className="text-info">Historial d'equips</h6>
                  <ul className="text-white-50 small">
                    {selectedJugador.teams?.length > 0 ? (
                      selectedJugador.teams.map((team, i) => (
                        <li key={i}>{team}</li>
                      ))
                    ) : (
                      <li>Cap equip registrat</li>
                    )}
                  </ul>

                  <Button
                    clase="btn btn-outline-info w-100 mt-3"
                    onClick={() => setSelectedJugador(null)}
                  >
                    TANCAR
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {confirmDelete && (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.85)",
              zIndex: 3000,
            }}
            onClick={() => setConfirmDelete(null)}
          >
            <div
              className="card bg-dark text-white border-danger p-4 shadow-lg"
              style={{ maxWidth: "400px", width: "90%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-danger mb-3">Confirmar eliminació</h4>

              <p>
                Segur que vols eliminar <strong>{confirmDelete.name}</strong>?
              </p>

              <div className="d-flex gap-2 mt-4">
                <Button
                  clase="btn btn-danger w-50"
                  onClick={async () => {
                    try {
                      await deleteJugador(confirmDelete._id);
                      setJugadors((prev) =>
                        prev.filter((j) => j._id !== confirmDelete._id)
                      );
                      setConfirmDelete(null);
                    } catch (error) {
                      console.error("Error eliminant jugador:", error);
                      alert("Error al eliminar el jugador");
                    }
                  }}
                >
                  Sí, eliminar
                </Button>

                <Button
                  clase="btn btn-outline-light w-50"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel·lar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Card;