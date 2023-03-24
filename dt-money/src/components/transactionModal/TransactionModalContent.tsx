import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

export function TransactionModalContent() {
  function transactionType(type: "income" | "outcome") {
    return (
      <>
        {type === "income" ? (
          <RadioGroup.Item
            id="item"
            value="income"
            className={`
              btn-ring text-green-300 bg-gray-700 flex flex-1 items-center justify-center gap-3 p-4 rounded-md
               data-[state=checked]:bg-green-500 hover:data-[state=unchecked]:bg-gray-600 hover:transition-colors
            `}
          >
            <ArrowCircleUp size={24} /> <span className="text-gray-100">Entrada</span>
          </RadioGroup.Item>
        ) : (
          <RadioGroup.Item
            id="item"
            value="outcome"
            className={`
              btn-ring text-red-500 focus:ring-red-300 border-none bg-gray-700 flex flex-1 items-center hover:transition-colors
              justify-center gap-3 p-4 rounded-md data-[state=checked]:bg-red-500 hover:data-[state=unchecked]:bg-gray-600
            `}
          >
            <ArrowCircleDown size={24} /> <span className="text-gray-100">Saída</span>
          </RadioGroup.Item>
        )}
      </>
    );
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 w-full h-screen bg-black/75" />
      <Dialog.Content
        className={`
        my-0 mx-auto max-w-2xl min-w-[32rem] fixed top-2/4 left-2/4 
        -translate-x-2/4 -translate-y-2/4 px-12 pt-10 bg-gray-800 rounded-md
      `}
      >
        <Dialog.Title className="font-bold text-2xl">Nova Transação</Dialog.Title>

        <Dialog.Close className="absolute top-6 right-6 btn border-none bg-transparent hover:bg-transparent">
          <X size={24} />
        </Dialog.Close>

        <form action="" className="flex flex-col gap-4 pt-8">
          <input
            required
            placeholder="Descrição"
            className="placeholder:text-gray-500 text-gray-300 p-4 rounded-md bg-gray-900"
            type="text"
          />
          <input
            required
            placeholder="Preço"
            className="placeholder:text-gray-500 text-gray-300 p-4 rounded-md bg-gray-900"
            type="number"
          />
          <input
            required
            placeholder="Categoria"
            className="placeholder:text-gray-500 text-gray-300 p-4 rounded-md bg-gray-900"
            type="text"
          />
          <RadioGroup.Root className="grid grid-cols-2 gap-4 mt-2 ">
            {transactionType("income")}
            {transactionType("outcome")}
          </RadioGroup.Root>
          <button
            type="submit"
            className={`
            rounded-md p-4 font-bold mt-10 btn mb-10
          `}
          >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
