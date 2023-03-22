import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";

interface SummaryCardProps {
  icon: "arrowUp" | "arrowDown" | "dollar";
  title: string;
  value: string;
}

export function SummaryCard({ icon }: SummaryCardProps) {
  const bgColor = icon === "dollar" ? "bg-green-500" : "bg-gray-600";
  return (
    <div className={`p-8 ${bgColor} rounded-md`}>
      <header className="flex justify-between items-center gap-2 pb-3 text-gray-300">
        <span>Entradas</span>
        {icon === "arrowUp" ? (
          <ArrowCircleUp size={32} className="text-green-500" />
        ) : icon === "arrowDown" ? (
          <ArrowCircleDown size={32} className="text-red-300" />
        ) : (
          <CurrencyDollar size={32} />
        )}
      </header>
      <strong className="font-bold text-3xl">R$ 17.400,00</strong>
    </div>
  );
}
