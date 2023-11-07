import { ReactElement } from 'react'

import useQueryStockTransactions from '../../queries/useQueryStockTransactions'
import StockTransactionsTable from './StockTransactionsTable'
import useDeleteStockTransaction from '../../queries/useDeleteStockTransaction'

const PortfolioScreen = (): ReactElement => {
  const { data: queryData } = useQueryStockTransactions({
    sortDirection: 'DESC',
    orderBy: 'date',
  })

  const { mutate: deleteStockTransaction } = useDeleteStockTransaction()

  const onDeleteButtonClick = (id: string) => {
    deleteStockTransaction(id)
  }

  return (
    <div>
      {queryData && (
        <div className="p-4">
          <StockTransactionsTable
            stockTransactions={queryData.data}
            totalCount={queryData.totalCount}
            nextCursor={queryData.nextCursor ?? null}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </div>
      )}
    </div>
  )
}

export default PortfolioScreen
