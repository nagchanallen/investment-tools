import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import queryKeys from './queryKeys'
import { APIClientContext } from '../providers/APIClientProvider'
import {
  GetStockTransactionsRequest,
  GetStockTransactionsResponse,
  GetStockTransactionsResponseSchema,
} from '../models/api/APIStockTransaction'

const useQueryStockTransactions = (
  requestData: GetStockTransactionsRequest
) => {
  const apiClient = useContext(APIClientContext)

  return useQuery({
    queryKey: queryKeys.StockTransactionList(requestData),
    queryFn: async () => {
      const { data } = await apiClient<GetStockTransactionsResponse>({
        method: 'POST',
        url: '/portfolio/stock-transactions',
        data: requestData,
      })

      return GetStockTransactionsResponseSchema.parse(data)
    },
  })
}

export default useQueryStockTransactions
