import {
  ProductDetails,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "../../styles/components/shoppingCartModal";
import i from "../../assets/shirt.png";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

export function ShoppingCartModal() {
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogClose>
          <X size={24} weight="bold" />
        </DialogClose>
        <Dialog.Title>Titulo Dessa merda</Dialog.Title>

        <ProductDetails>
          <Image src={i} alt="" height={94} width={94} />
          <div>
            <p>Camiseta 01</p>
            <span>R$ 79.99</span>
            <button>Remover</button>
          </div>
        </ProductDetails>

        <footer>
          <div>
            <span>Quantidade</span>
            <span>03 itens</span>
          </div>
          <div>
            <h2>Valor total</h2>
            <span>R$ 270.89</span>
          </div>

          <button>Finalizar compra</button>
        </footer>
      </DialogContent>
    </Dialog.Portal>
  );
}
