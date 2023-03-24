import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import { TransactionsTable } from "./TransactionsTable";

export function Transactions() {

  return (
    <div className="mt-16">
      <SearchForm />
      <TransactionsTable />
    </div>
  );
}
