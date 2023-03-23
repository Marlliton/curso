import { MagnifyingGlass } from "phosphor-react";

export function SearchForm() {
  return (
    <form className="flex gap-4 max-w-6xl my-0 mx-auto px-6 mb-6">
      <input
        className="bg-gray-900 p-4 placeholder:text-gray-500 text-gray-300 flex-1 rounded-md"
        placeholder="Busque uma transação"
        type="text"
      />
      <button
        className={`
        flex items-center bg-transparent gap-3 py-4 px-5 rounded-md 
        text-gray-300 font-bold btn hover:bg-green-500 border-green-300 hover:border-green-500
      `}
      >
        <MagnifyingGlass size={20} /> <span>Buscar</span>
      </button>
    </form>
  );
}
