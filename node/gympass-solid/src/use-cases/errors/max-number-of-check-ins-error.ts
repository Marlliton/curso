export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("Max number of check-inst exceeded.");
  }
}
