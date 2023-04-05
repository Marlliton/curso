import { Handbag } from "phosphor-react";
import {
  ShoppingCartBagContainer,
  Counter,
} from "../../styles/components/shoppingCartBagContainer";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCartModal } from "../shoppingCartModal";

interface ShoppingCartBagProps {
  showCounter?: boolean;
  green?: boolean;
  onClick?(event: any): void;
}

export function ShoppingCartBag({
  showCounter,
  green,
  onClick: handleClick,
}: ShoppingCartBagProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ShoppingCartBagContainer
          css={{ backgroundColor: `${green ? "$green500" : ""}` }}
          onClick={handleClick}
        >
          {showCounter && <Counter>22</Counter>}
          <Handbag size={24} />
        </ShoppingCartBagContainer>
      </Dialog.Trigger>

      <ShoppingCartModal />
    </Dialog.Root>
  );
}
