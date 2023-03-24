import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { currencyFormatter } from "../../utils/formatter";

interface SummaryCardProps {
  icon: "arrowUp" | "arrowDown" | "dollar";
  title: string;
  value: number;
}

export function SummaryCard({ icon, value, title }: SummaryCardProps) {
  const bgColor = icon === "dollar" ? "bg-green-700" : "bg-gray-600";
  return (
    <div className={`p-8 ${bgColor} rounded-md`}>
      <header className="flex justify-between items-center gap-2 pb-3 text-gray-300">
        <span>{title}</span>
        {icon === "arrowUp" ? (
          <ArrowCircleUp size={32} className="text-green-500" />
        ) : icon === "arrowDown" ? (
          <ArrowCircleDown size={32} className="text-red-300" />
        ) : (
          <CurrencyDollar size={32} />
        )}
      </header>
      <strong className="font-bold text-3xl">{currencyFormatter.format(value)}</strong>
    </div>
  );
}
