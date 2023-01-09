export type Event = {
  id: number
  name: string
  date: string
  time: string
  location: string
  tickets_available: number
  ticket_price: number
  created_at: string
  updated_at: string
}

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
