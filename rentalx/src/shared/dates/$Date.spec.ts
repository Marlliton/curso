import { $Date } from "./$Date";

test("Deve criar uma dada", () => {
  const date = $Date.diffInDays(new Date("2023-01-01"), new Date("2023-01-02"));
  console.log(date)
})