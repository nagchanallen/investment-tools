/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'flowbite-react'
import { ReactElement } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  HeaderGroup,
  RowModel,
} from '@tanstack/react-table'

interface TableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[]
}

const TableHeader = <TData,>(props: TableHeaderProps<TData>): ReactElement => {
  const { headerGroups } = props

  return (
    <Table.Head>
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((header) => (
          <Table.HeadCell key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </Table.HeadCell>
        ))
      )}
    </Table.Head>
  )
}

interface TableBodyProps<TData> {
  rowModel: RowModel<TData>
}

const TableBody = <TData,>(props: TableBodyProps<TData>): ReactElement => {
  const { rowModel } = props

  return (
    <Table.Body>
      {rowModel.rows.map((row) => (
        <Table.Row key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Table.Cell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  )
}

export interface AppDataTableProps<TData> {
  className?: string
  data: TData[]
  columns: ColumnDef<TData, any>[]
}

const AppDataTable = <TData,>(
  props: AppDataTableProps<TData>
): ReactElement => {
  const { className, data, columns } = props

  const tableInstance = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const headerGroups = tableInstance.getHeaderGroups()
  const rowModel = tableInstance.getRowModel()

  return (
    <Table className={className} striped={true} hoverable={true}>
      <TableHeader headerGroups={headerGroups} />
      <TableBody rowModel={rowModel} />
    </Table>
  )
}

export default AppDataTable
