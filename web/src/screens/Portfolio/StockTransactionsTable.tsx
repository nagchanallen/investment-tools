import { ReactElement } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { AppStockTransaction } from '../../models/app/AppStockTransaction'
import AppDataTable from '../../components/AppDataTable'
import { fromISOStringToUTCDate } from '../../utils/dateTime'

const columnHelper = createColumnHelper<AppStockTransaction>()

const columns = [
  columnHelper.accessor('date', {
    id: 'date',
    header: 'Date',
    cell: (info) => fromISOStringToUTCDate(info.getValue()),
  }),
  columnHelper.accessor('code', {
    id: 'code',
    header: 'Code',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('action', {
    id: 'action',
    header: 'Action',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    id: 'price',
    header: 'Price',
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor('commission', {
    id: 'commission',
    header: 'Commission',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('remark', {
    id: 'remark',
    header: 'Remark',
    cell: (info) => info.getValue() ?? '-',
  }),
]

interface Props {
  className?: string
  stockTransactions: AppStockTransaction[]
  totalCount: number
  nextCursor: string | null
}

const StockTransactionsTable = (props: Props): ReactElement => {
  const { className, stockTransactions } = props

  return (
    <AppDataTable
      className={className}
      data={stockTransactions}
      columns={columns}
    />
  )
}

export default StockTransactionsTable
