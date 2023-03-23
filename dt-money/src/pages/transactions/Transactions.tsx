import { Header } from "../../components/header/Header";
import { Summary } from "../../components/summary/Summary";
import { TransactionsTable } from "./TransactionsTable";
import { SearchForm } from "./SearchForm";

export function Transactions() {
  return (
    <div className="mt-16">
      <SearchForm />
      <TransactionsTable />
    </div>
  );
}
