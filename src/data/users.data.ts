export interface DataType {
  id: number
  name: string
  email: string
  active: boolean
  register_date: string
}

export type DataIndex = keyof DataType

export const USERS: DataType[] = [
  {
    id: 1,
    name: 'Иванов Иван',
    email: 'email1@email.ru',
    active: true,
    register_date: '2025-01-01'
  },
  {
    id: 2,
    name: 'Петров Пётр',
    email: 'email2@email.ru',
    active: false,
    register_date: '2025-02-01'
  },
  {
    id: 3,
    name: 'Сидоров Сидор',
    email: 'email3@email.ru',
    active: true,
    register_date: '2025-03-03'
  },
  {
    id: 4,
    name: 'Кузьмин Кульма',
    email: 'email4@email.ru',
    active: true,
    register_date: '2025-04-04'
  }
]
