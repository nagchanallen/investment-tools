import { ReactElement } from 'react'

import useQueryStockTransactions from '../../queries/useQueryStockTransactions'
import StockTransactionsTable from './StockTransactionsTable'

const PortfolioScreen = (): ReactElement => {
  const { data: queryData } = useQueryStockTransactions({
    sortDirection: 'DESC',
    orderBy: 'date',
  })

  return (
    <div>
      {queryData && (
        <div className="p-4">
          <StockTransactionsTable
            stockTransactions={queryData.data}
            totalCount={queryData.totalCount}
            nextCursor={queryData.nextCursor ?? null}
          />
        </div>
      )}
    </div>
  )
}

export default PortfolioScreen
