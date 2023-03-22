import { SummaryCard } from "./SummaryCard";

export function Summary() {
  return (
    <section className="px-6 w-full max-w-6xl my-0 mx-auto grid grid-cols-3 gap-8 -mt-20">
      <SummaryCard icon="arrowUp" title="Entradas" value="R$ 17.400,00" />
      <SummaryCard icon="arrowDown" title="Saídas" value="R$ 17.400,00" />
      <SummaryCard icon="dollar" title="Total" value="R$ 17.400,00" />
    </section>
  );
}
