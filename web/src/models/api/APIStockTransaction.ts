import { z } from 'zod'

import { fromISOStringToUTCDateTime } from '../../utils/dateTime'
import {
  APIPaginationRequestSchema,
  APIPaginationResponseSchema,
} from './APIPagination'

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

export const GetStockTransactionsRequestSchema = APIPaginationRequestSchema

export type GetStockTransactionsRequest = z.input<
  typeof GetStockTransactionsRequestSchema
>

export const GetStockTransactionsResponseSchema =
  APIPaginationResponseSchema.merge(
    z.object({
      data: z.array(APIStockTransactionSchema),
    })
  )

export type GetStockTransactionsResponse = z.output<
  typeof GetStockTransactionsResponseSchema
>
