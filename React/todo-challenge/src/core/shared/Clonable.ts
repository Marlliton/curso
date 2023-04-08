interface ClonableProps<TProps, T> {
  clone(props: Partial<TProps>): T;
}

export abstract class Clonable<T, TProps> implements ClonableProps<TProps, T> {
  constructor(protected _props: TProps) {}

  get props() { return this._props }

  clone(props: Partial<TProps>): T {
    const cloneProps = { ...this._props, ...props };
    return new (this.constructor as new (props: TProps) => T)(cloneProps);
  }
}
