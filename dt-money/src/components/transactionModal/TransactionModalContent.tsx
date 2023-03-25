import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useTransactions } from "../../hooks/useTransactions";

const schema = z.object({
  price: z.number(),
  description: z.string(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof schema>;

interface TransactionModalContentProps {
  onCloseModal(): void;
}

export function TransactionModalContent({ onCloseModal }: TransactionModalContentProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    defaultValues: {
      price: 0,
      description: "",
      category: "",
      type: "income",
    },
    resolver: zodResolver(schema),
  });
  const { createTransaction } = useTransactions();

  async function handleNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data);
    reset();
    onCloseModal();
  }

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

        <form onSubmit={handleSubmit(handleNewTransaction)} className="flex flex-col gap-4 pt-8">
          <input
            required
            placeholder="Descrição"
            className="placeholder:text-gray-500 text-gray-300 p-4 rounded-md bg-gray-900"
            type="text"
            {...register("description")}
          />

          <input
            required
            placeholder="Preço"
            className="placeholder:text-gray-500 text-gray-300 p-4 rounded-md bg-gray-900"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />

          <input
            required
            placeholder="Categoria"
            className="placeholder:text-gray-500 text-gray-300 p-4 rounded-md bg-gray-900"
            type="text"
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 gap-4 mt-2 "
                >
                  {transactionType("income")}
                  {transactionType("outcome")}
                </RadioGroup.Root>
              );
            }}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className={`
            btn btn-ring ${
              !isSubmitting && "btn-hover"
            } disabled:cursor-not-allowed disabled:opacity-60 
            rounded-md p-4 font-bold mt-10 mb-10
          `}
          >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
