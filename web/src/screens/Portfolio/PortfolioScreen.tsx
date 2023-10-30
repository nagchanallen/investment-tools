import { ReactElement } from 'react'
import useQueryStockTransactions from '../../queries/useQueryStockTransactions'

const PortfolioScreen = (): ReactElement => {
  const { data, error } = useQueryStockTransactions({
    sortDirection: 'DESC',
    orderBy: 'id',
    limit: 10,
  })

  return (
    <div>
      <h5>{JSON.stringify(data)}</h5>
      <p>{JSON.stringify(error)}</p>
    </div>
  )
}

export default PortfolioScreen
