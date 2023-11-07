import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  DeleteStockTransactionResponse,
  DeleteStockTransactionResponseSchema,
} from '../models/api/APIStockTransaction'
import { APIClientContext } from '../providers/APIClientProvider'
import queryKeys from './queryKeys'

const useDeleteStockTransaction = () => {
  const apiClient = useContext(APIClientContext)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient<DeleteStockTransactionResponse>({
        method: 'DELETE',
        url: `/portfolio/stock-transaction/${id}`,
      })

      const parsedData = DeleteStockTransactionResponseSchema.parse(data)

      queryClient.invalidateQueries({ queryKey: queryKeys.Portfolio() })

      return parsedData
    },
  })
}

export default useDeleteStockTransaction
