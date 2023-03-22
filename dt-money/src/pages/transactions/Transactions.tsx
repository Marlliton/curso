import { Header } from "../../components/header/Header";
import { Summary } from "../../components/summary/Summary";
import { TransactionsTable } from "./TransactionsTable";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsTable />
    </div>
  );
}
