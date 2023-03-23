import { Header } from "./components/header/Header";
import { Summary } from "./components/summary/Summary";
import { Transactions } from "./pages/transactions/Transactions";

function App() {
  return (
    <div className="">
      <Header />
      <Summary />
      
      <Transactions />
    </div>
  );
}

export { App };
