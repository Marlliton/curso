import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { TransactionModalContent } from "../transactionModal/TransactionModalContent";
import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <header className="bg-gray-900 pt-6 pb-28">
      <div className="px-6 w-full max-w-6xl my-0 mx-auto flex justify-between items-center">
        <img src={logo} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className={`
              btn btn-ring px-5 py-3 rounded-md font-bold
            `}
            >
              Nova Transação
            </button>
          </Dialog.Trigger>

          <TransactionModalContent />
        </Dialog.Root>
      </div>
    </header>
  );
}
