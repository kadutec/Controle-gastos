import { useEffect, useState } from "react";
import { api } from "../services/api";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  type: string;
  personId: number;
  person?: {
    id: number;
    name: string;
    age: number;
  };
};

type Person = {
  id: number;
  name: string;
  age: number;
};

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState("expense");
  const [personId, setPersonId] = useState<number | "">("");

  async function loadTransactions() {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  }

  async function loadPeople() {
    const res = await api.get("/people");
    setPeople(res.data);
  }

  async function createTransaction() {
    if (
      description === "" ||
      amount === "" ||
      personId === ""
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await api.post("/transactions", {
        description,
        amount,
        type,
        personId,
      });

      setDescription("");
      setAmount("");
      setPersonId("");
      setType("expense");

      loadTransactions();
    } catch (err: any) {
      alert(err.response?.data || "Erro ao criar transação");
    }
  }

  useEffect(() => {
    loadPeople();
    loadTransactions();
  }, []);

  return (
    <>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-success text-white">
          Cadastro de Transações
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Descrição</label>
              <input
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Valor</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value === ""
                      ? ""
                      : Number(e.target.value)
                  )
                }
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Tipo</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Pessoa</label>
              <select
                className="form-select"
                value={personId}
                onChange={(e) =>
                  setPersonId(
                    e.target.value === ""
                      ? ""
                      : Number(e.target.value)
                  )
                }
              >
                <option value="">
                  Selecione...
                </option>
                {people.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-success w-100"
                onClick={createTransaction}
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
          Transações
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Pessoa</th>
                <th>Valor</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4"
                  >
                    Nenhuma transação cadastrada.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.description}</td>
                    <td>{t.person?.name ?? t.personId}</td>
                    <td>
                      R$ {Number(t.amount).toFixed(2)}
                    </td>
                    <td>
                      {t.type === "income" ? (
                        <span className="badge bg-success">
                          Receita
                        </span>
                      ) : (
                        <span className="badge bg-danger">
                          Despesa
                        </span>
                      )}
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