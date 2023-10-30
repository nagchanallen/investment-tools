import { GetStockTransactionsRequest } from '../models/api/APIStockTransaction'

const queryKeys = {
  API: () => ['api'],
  StockTransactionsList: (request: GetStockTransactionsRequest) => [
    'api',
    'stockTransactions',
    request,
  ],
}

export default queryKeys
