import { useState } from "react";

import { Navbar } from "./components/Navbar";

import { People } from "./pages/People";
import { Transactions } from "./pages/Transactions";
import { Summary } from "./pages/Summary";

function App() {

    const [page, setPage] = useState("summary");

    return (
        <>
            <Navbar
                page={page}
                setPage={setPage}
            />
            <div className="container mt-4">
                {page === "people" && <People />}
                {page === "transactions" && <Transactions />}
                {page === "summary" && <Summary />}
            </div>
        </>
    );
}

export default App;