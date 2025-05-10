export interface DataType {
  id: number
  name: string
  email: string
  active: boolean
  register_date: string
}

export type DataIndex = keyof DataType

export const ACCOUNTS: DataType[] = [
  {
    id: 1,
    name: 'аккаунт 1',
    email: 'email1@email.ru',
    active: true,
    register_date: '2025-01-01'
  },
  {
    id: 2,
    name: 'аккаунт 2',
    email: 'email2@email.ru',
    active: false,
    register_date: '2025-02-01'
  },
  {
    id: 3,
    name: 'аккаунт 3',
    email: 'email3@email.ru',
    active: true,
    register_date: '2025-03-03'
  },
  {
    id: 4,
    name: 'аккаунт 4',
    email: 'email4@email.ru',
    active: true,
    register_date: '2025-04-04'
  }
]
