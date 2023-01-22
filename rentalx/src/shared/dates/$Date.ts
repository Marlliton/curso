type Dt = $Date | Date;

export class $Date extends Date {
  static addDays(date: Dt, numberOfDays: number): $Date {
    return new $Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + numberOfDays,
      date.getHours(),
      date.getMinutes(),
      date.getMilliseconds()
    );
  }

  static create(date: Dt | null): $Date {
    return date?.getTime() ? new $Date(date.getTime()) : new $Date(new Date().getTime());
  }

  static diffInHours(startDate: Dt, endDate: Dt): number {
    console.log(startDate);
    const diferenceInMilliseconds = Math.abs(startDate.getTime() - endDate.getTime());
    const diferenceInHours = diferenceInMilliseconds / 1000 / 3600;

    return Math.round(diferenceInHours);
  }

  static diffInDays(startDate: Dt, endDate: Dt) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}