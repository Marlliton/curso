import { Handbag } from "phosphor-react";
import {
  ShoppingCartBagContainer,
  Counter,
} from "../../styles/components/shoppingCartBagContainer";

interface ShoppingCartBagProps {
  showCounter?: boolean;
}

export function ShoppingCartBag({ showCounter }: ShoppingCartBagProps) {
  return (
    <ShoppingCartBagContainer>
      {showCounter && <Counter>22</Counter>}
      <Handbag size={24} />
    </ShoppingCartBagContainer>
  );
}
