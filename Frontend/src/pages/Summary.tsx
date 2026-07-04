import { useEffect, useState } from "react";
import { api } from "../services/api";

type PersonSummary = {
  id: number;
  name: string;
  income: number;
  expense: number;
  balance: number;
};

type Totals = {
  income: number;
  expense: number;
  balance: number;
};

export function Summary() {
  const [people, setPeople] = useState<PersonSummary[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);

  async function loadSummary() {
    const response = await api.get("/summary");

    setPeople(response.data.people);
    setTotals(response.data.totals);
  }

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <>
      <h2 className="mb-4 fw-bold">
        Resumo Financeiro
      </h2>
      {totals && (
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="summary-card bg-success shadow-sm">
              <h5>Receitas</h5>
              <h2>
                R$ {totals.income.toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary-card bg-danger shadow-sm">
              <h5>Despesas</h5>
              <h2>
                R$ {totals.expense.toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary-card bg-primary shadow-sm">
              <h5>Saldo</h5>
              <h2>
                R$ {totals.balance.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      )}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          Resumo por Pessoa
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td className="text-success">
                    R$ {p.income.toFixed(2)}
                  </td>
                  <td className="text-danger">
                    R$ {p.expense.toFixed(2)}
                  </td>
                  <td
                    className={
                      p.balance >= 0
                        ? "text-primary fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    R$ {p.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}