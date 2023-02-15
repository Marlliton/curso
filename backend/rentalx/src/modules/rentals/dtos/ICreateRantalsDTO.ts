export interface ICreateRentalDTO {
  carId: string;
  expectReturnDate: Date;
  userId: string;
  id?: string;
  end_date?: Date;
  total?: number;
}
