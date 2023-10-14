export interface IHeader {
  title: string
  fontSize?: 'small' | 'normal'
}

export interface IItem {
  id: number
  name: string
  address: string
  date: string
  status: string
  comment?: string
}