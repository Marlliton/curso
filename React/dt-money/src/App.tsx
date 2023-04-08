import { Header } from "./components/header/Header";
import { Summary } from "./components/summary/Summary";
import { TransactionsProvider } from "./context/TransactionsContext";
import { Transactions } from "./pages/transactions/Transactions";

function App() {
  return (
    <div>
      <TransactionsProvider>
        <Header />
        <Summary />

        <Transactions />
      </TransactionsProvider>
    </div>
  );
}

export { App };
