import { v4 } from "uuid";
import { Clonable } from "../shared/Clonable";

interface EntityProps {
  id?: string;
}

export abstract class Entity<T, TProps extends EntityProps> extends Clonable<T, TProps> {
  protected _props: TProps;

  constructor(props: TProps) {
    super(props);
    if (!props?.id) {
      props.id = v4();
    }

    this._props = props;
  }
}
