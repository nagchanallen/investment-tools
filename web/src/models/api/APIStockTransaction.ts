import { z } from 'zod'

import { fromISOStringToUTCDateTime } from '../../utils/dateTime'

export const APIStockTransactionSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  action: z.string(),
  date: z.string().transform((date) => fromISOStringToUTCDateTime(date)),
  amount: z.number().int().nonnegative(),
  price: z.number(),
  commission: z.number().nullish(),
  remark: z.string().nullish(),
  updatedAt: z.string().transform((date) => fromISOStringToUTCDateTime(date)),
})

export type APIStockTransaction = z.infer<typeof APIStockTransactionSchema>

export const GetStockTransactionsRequestSchema = z.object({
  sortDirection: z.enum(['ASC', 'DESC']),
  orderBy: z.string(),
  limit: z.number().int(),
  cursor: z.string().nullish(),
})

export type GetStockTransactionsRequest = z.input<
  typeof GetStockTransactionsRequestSchema
>

export const GetStockTransactionsResponseSchema = z.object({
  data: z.array(APIStockTransactionSchema),
  nextCursor: z.string().uuid().nullish(),
  totalCount: z.number().int().nonnegative(),
})

export type GetStockTransactionsResponse = z.output<
  typeof GetStockTransactionsResponseSchema
>
