import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();
  console.log("🚀 ~ file: [id].tsx:5 ~ Product ~ query:", query);

  return (
    <div>
      <h1>Product: {query.id}</h1>
    </div>
  );
}
