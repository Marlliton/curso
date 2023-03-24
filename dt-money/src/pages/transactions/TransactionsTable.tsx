import { useTransactions } from "../../hooks/useTransactions";
import { currencyFormatter, dataFormatter } from "../../utils/formatter";

type HighlightPrice = {
  variant: "income" | "outcome";
  price: string;
};

export function TransactionsTable() {
  const { transactions } = useTransactions();

  function priceHighlight({ variant, price }: HighlightPrice) {
    return (
      <span className={`${variant === "income" ? "text-green-300" : "text-red-300"}`}>
        {variant === "outcome" ? `- ${price}` : price}
      </span>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2">
        <tbody>
          {transactions.map(transaction => {
            return (
              <tr key={transaction.id}>
                <td
                  className="py-5 px-8 bg-gray-700 first:rounded-tl-md first:rounded-bl-md"
                  width={"50%"}
                >
                  {transaction.description}
                </td>
                <td className={`py-5 px-8 bg-gray-700`}>
                  {priceHighlight({
                    variant: transaction.type,
                    price: currencyFormatter.format(transaction.price),
                  })}
                </td>
                <td className="py-5 px-8 bg-gray-700">{transaction.category}</td>
                <td className="py-5 px-8 bg-gray-700 last:rounded-br-md last:rounded-tr-md">
                  {dataFormatter.format(new Date(transaction.createdAt))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
