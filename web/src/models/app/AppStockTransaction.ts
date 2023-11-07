import { DateTime } from 'luxon'

export interface AppStockTransaction {
  code: string
  date: DateTime
  id: string
  action: string
  amount: number
  price: number
  updatedAt: DateTime
  commission?: number | null | undefined
  remark?: string | null | undefined
}
