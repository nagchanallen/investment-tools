import { ReactElement, useMemo } from 'react'
import { Button } from 'flowbite-react'
import { createColumnHelper } from '@tanstack/react-table'

import { AppStockTransaction } from '../../models/app/AppStockTransaction'
import AppDataTable from '../../components/AppDataTable'
import { fromISOStringToUTCDate } from '../../utils/dateTime'

const columnHelper = createColumnHelper<AppStockTransaction>()

interface TableColumnsOptions {
  onDeleteButtonClick: (id: string) => void
}

const makeTableColumns = ({ onDeleteButtonClick }: TableColumnsOptions) => [
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
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (props) => (
      <Button
        color="failure"
        onClick={() => onDeleteButtonClick(props.row.original.id)}
      >
        Delete
      </Button>
    ),
  }),
]

interface Props {
  className?: string
  stockTransactions: AppStockTransaction[]
  totalCount: number
  nextCursor: string | null
  onDeleteButtonClick: (id: string) => void
}

const StockTransactionsTable = (props: Props): ReactElement => {
  const { className, stockTransactions, onDeleteButtonClick } = props

  const columns = useMemo(
    () =>
      makeTableColumns({
        onDeleteButtonClick,
      }),
    [onDeleteButtonClick]
  )

  return (
    <AppDataTable
      className={className}
      data={stockTransactions}
      columns={columns}
    />
  )
}

export default StockTransactionsTable
