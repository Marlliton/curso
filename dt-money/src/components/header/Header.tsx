import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <header className="bg-gray-900 pt-6 pb-28">
      <div className="px-6 w-full max-w-6xl my-0 mx-auto flex justify-between items-center">
        <img src={logo} alt="" />
        <button
          className={`
          bg-green-500 px-5 py-3 rounded-md hover:bg-green-700 hover:transition-colors
          font-bold
        `}
        >
          Nova Transação
        </button>
      </div>
    </header>
  );
}
