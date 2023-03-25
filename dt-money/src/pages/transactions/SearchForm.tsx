import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTransactions } from "../../hooks/useTransactions";

const schema = z.object({
  query: z.string(),
});

type SearchFormInput = z.infer<typeof schema>;

export function SearchForm() {
  const { loadTransactions } = useTransactions();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(schema),
  });

  async function handleSearchTransactions(data: SearchFormInput) {
    await loadTransactions(data.query);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchTransactions)}
      className="flex gap-4 max-w-6xl my-0 mx-auto px-6 mb-6"
    >
      <input
        {...register("query")}
        className="bg-gray-900 p-4 placeholder:text-gray-500 text-gray-300 flex-1 rounded-md"
        placeholder="Busque uma transação"
        type="text"
      />
      <button
        disabled={isSubmitting}
        className={`
        btn flex items-center bg-transparent gap-3 py-4 px-5 rounded-md text-green-300 font-bold border-green-300
        outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          !isSubmitting && "hover:bg-green-500 hover:border-green-500 hover:text-gray-300"
        }
      `}
      >
        <MagnifyingGlass size={20} /> <span>Buscar</span>
      </button>
    </form>
  );
}
