import { z } from 'zod'

export const APIPaginationRequestSchema = z.object({
  orderBy: z.string(),
  limit: z.number().int().nullish(),
  cursor: z.string().nullish(),
  sortDirection: z.enum(['ASC', 'DESC']),
})

export type APIPaginationRequest = z.input<typeof APIPaginationRequestSchema>

export const APIPaginationResponseSchema = z.object({
  nextCursor: z.string().uuid().nullish(),
  totalCount: z.number().int().nonnegative(),
})

export type APIPaginationResponse = z.output<typeof APIPaginationResponseSchema>
