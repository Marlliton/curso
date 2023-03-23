interface HighlightPrice {
  variant: "income" | "outcome";
  price: string;
}

export function TransactionsTable() {
  function priceHighlight({ variant, price }: HighlightPrice) {
    return (
      <span className={`${variant === "income" ? "text-green-300" : "text-red-300"}`}>{price}</span>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2">
        <tbody>
          <tr>
            <td
              className="py-5 px-8 bg-gray-700 first:rounded-tl-md first:rounded-bl-md"
              width={"50%"}
            >
              Desenvolvimento de site
            </td>
            <td className={`py-5 px-8 bg-gray-700`}>
              {priceHighlight({ variant: "income", price: "R$ 12.000,00" })}
            </td>
            <td className="py-5 px-8 bg-gray-700">venda</td>
            <td className="py-5 px-8 bg-gray-700 last:rounded-br-md last:rounded-tr-md">
              10/04/2022
            </td>
          </tr>
          <tr>
            <td
              className="py-5 px-8 bg-gray-700 first:rounded-tl-md first:rounded-bl-md"
              width={"50%"}
              >
              Hamburger
            </td>
            <td className="py-5 px-8 bg-gray-700">
              {priceHighlight({ variant: "outcome", price: "- R$ 59,00" })}
            </td>
            <td className="py-5 px-8 bg-gray-700">Alimentação</td>
            <td className="py-5 px-8 bg-gray-700 last:rounded-br-md last:rounded-tr-md">
              10/04/2022
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
