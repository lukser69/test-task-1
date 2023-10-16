export interface IUser {
  name: string
  password: string
}

export interface IUserData {
  name: string
  role: string
}

export interface IOrder {
  id?: number
  name: string
  address: string
  date: string
  status: string
  comment: string
}