type Props = {
    page: string;
    setPage: (page: string) => void;
};

export function Navbar({ page, setPage }: Props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container">
                <span className="navbar-brand fw-bold">
                    <i className="bi bi-wallet2 me-2"></i>
                    Controle de Gastos
                </span>
                <div className="ms-auto">
                    <button
                        className={`btn me-2 ${page === "people" ? "btn-light" : "btn-outline-light"}`}
                        onClick={() => setPage("people")}
                    >
                        <i className="bi bi-people-fill me-2"></i>
                        Pessoas
                    </button>
                    <button
                        className={`btn me-2 ${page === "transactions" ? "btn-light" : "btn-outline-light"}`}
                        onClick={() => setPage("transactions")}
                    >
                        <i className="bi bi-cash-stack me-2"></i>
                        Transações
                    </button>
                    <button
                        className={`btn ${page === "summary" ? "btn-light" : "btn-outline-light"}`}
                        onClick={() => setPage("summary")}
                    >
                        <i className="bi bi-bar-chart-fill me-2"></i>
                        Resumo
                    </button>
                </div>
            </div>
        </nav>
    );
}