import { useSummary } from "../../hooks/useSummary";
import { SummaryCard } from "./SummaryCard";

export function Summary() {
  const { summary } = useSummary();
  return (
    <section className="px-6 w-full max-w-6xl my-0 mx-auto grid grid-cols-3 gap-8 -mt-20">
      <SummaryCard icon="arrowUp" title="Entradas" value={summary.income} />
      <SummaryCard icon="arrowDown" title="Saídas" value={summary.outcome} />
      <SummaryCard icon="dollar" title="Total" value={summary.total} />
    </section>
  );
}
