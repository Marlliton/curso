export interface IUserRepositoryDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar?: string;
  id?: string
}

export interface IUserTokensRepositoryDTO {
  user_id: string;
  refresh_token: string;
  expired_date: Date;
}
