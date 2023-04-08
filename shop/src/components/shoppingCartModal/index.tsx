import {
  ProductDetails,
  DialogContent,
  DialogOverlay,
  DialogClose,
  ProductWrapper,
} from "../../styles/components/shoppingCartModal";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useCart } from "@/hooks/useCart";
import axios from "axios";

export function ShoppingCartModal() {
  const { products, removeFromCart, getTotalPrice } = useCart();

  async function handlePayProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        products,
      });

      window.location.href = response.data;
    } catch (error) {}
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <DialogClose>
          <X size={24} weight="bold" />
        </DialogClose>

        <Dialog.Title>Sacola de compras</Dialog.Title>

        <ProductWrapper>
          {products.map((prod) => {
            return (
              <ProductDetails key={prod.id}>
                <Image src={prod.image} alt="" height={94} width={94} />
                <div>
                  <p>{prod.name}</p>
                  <span>{prod.price}</span>
                  <button onClick={() => removeFromCart(prod.id)}>Remover</button>
                </div>
              </ProductDetails>
            );
          })}
        </ProductWrapper>

        <footer>
          <div>
            <span>Quantidade</span>
            <span>{products.length} itens</span>
          </div>
          <div>
            <h2>Valor total</h2>
            <strong>{getTotalPrice()}</strong>
          </div>

          <button onClick={handlePayProduct}>Finalizar compra</button>
        </footer>
      </DialogContent>
    </Dialog.Portal>
  );
}
