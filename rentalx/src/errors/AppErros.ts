export class AppErros {
  constructor(private _message: string, private _code = 400) {}

  get message() { return this._message }
  get code() { return this._code }
}
