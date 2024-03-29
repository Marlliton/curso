import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface CreateTransactionInput {
  type: "income" | "outcome";
  price: number;
  description: string;
  category: string;
}

interface TransactionsProps extends CreateTransactionInput {
  id: string;
  createdAt: string;
}

interface TransactionsContextData {
  transactions: TransactionsProps[];
  createTransaction(transaction: CreateTransactionInput): Promise<void>;
  loadTransactions(query?: string): Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  const loadTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(data);
  }, []);

  const createTransaction = useCallback(async (transaction: CreateTransactionInput) => {
    const newTransaction = Object.assign(transaction, {
      createdAt: new Date(),
    });

    const { data } = await api.post("/transactions", newTransaction);

    setTransactions((state) => [data, ...state]);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        loadTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
