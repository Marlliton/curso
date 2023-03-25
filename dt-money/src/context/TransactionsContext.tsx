import { createContext, ReactNode, useEffect, useState } from "react";

interface TransactionsProps {
  id: string;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextData {
  transactions: TransactionsProps[];
  createTransaction(transaction: any): Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  const baseURL = "http://localhost:3333/transactions";

  async function loadTransactions() {
    const response = await fetch(baseURL);
    const transactions = await response.json();

    setTransactions(transactions);
  }

  async function createTransaction(transaction: any) {
    const newTransaction = Object.assign(transaction, {
      createdAt: new Date(),
    });

    const response = await fetch(baseURL, {
      body: JSON.stringify(newTransaction),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await loadTransactions();
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
