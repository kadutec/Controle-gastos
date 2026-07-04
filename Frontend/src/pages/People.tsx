import { useEffect, useState } from "react";
import { api } from "../services/api";

type Person = {
  id: number;
  name: string;
  age: number;
};

export function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");

  async function loadPeople() {
    const response = await api.get("/people");
    setPeople(response.data);
  }

  async function createPerson() {
    if (!name || age === "") {
      alert("Preencha todos os campos.");
      return;
    }

    await api.post("/people", {
      name,
      age,
    });

    setName("");
    setAge("");

    loadPeople();
  }

  async function deletePerson(id: number) {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir esta pessoa?"
    );

    if (!confirmDelete) return;

    await api.delete(`/people/${id}`);

    loadPeople();
  }

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          Cadastro de Pessoas
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">Nome</label>
              <input
                className="form-control"
                placeholder="Digite o nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Idade</label>
              <input
                className="form-control"
                type="number"
                placeholder="Idade"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value === "" ? "" : Number(e.target.value))
                }
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-success w-100"
                onClick={createPerson}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-header">
          Pessoas Cadastradas
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {people.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Nenhuma pessoa cadastrada.
                  </td>
                </tr>
              ) : (
                people.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {p.age} anos
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deletePerson(p.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}