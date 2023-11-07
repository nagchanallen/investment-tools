import { GetStockTransactionsRequest } from '../models/api/APIStockTransaction'

const queryKeys = {
  API: () => ['api'],
  Portfolio: () => ['api', 'portfolio'],
  StockTransactionList: (request: GetStockTransactionsRequest) => [
    'api',
    'portfolio',
    'stockTransactionList',
    request,
  ],
}

export default queryKeys
