"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, TriangleAlertIcon, AlertTriangle, AlarmClock } from "lucide-react"
import { differenceInCalendarDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DatePickerWithRange } from "./date-picker-with-range"
import RankCard from "./rank-card"

export type Payment = {
    id: string
    name: string
    type: "월보장" | "대행요청"
    startDate: Date
    endDate: Date
    keyword: string
    rank: number
    pbcount: number
    pacount: number
    jbcount: number
    jacount: number
    rbcount: number
    racount: number
    bbcount: number
    bacount: number
    sbcount: number
    sacount: number
    status: "pending" | "processing" | "success" | "failed"
  }

const data: Payment[] = [
  {
    id: "0001",
    name: "남은대게",
    type: "월보장",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-04-14"),
    keyword: "영덕맛집",
    rank: 4,
    pbcount: 100,
    pacount: 10,
    jbcount: 10,
    jacount: 0,
    rbcount: 20,
    racount: 10,
    bbcount: 10,
    bacount: 1,
    sbcount: 10,
    sacount: 1,
    status: "processing",
  },
  {
    id: "0002",
    name: "해린횟집",
    type: "월보장",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-04-14"),
    keyword: "영덕맛집",
    rank: 4,
    pbcount: 100,
    pacount: 10,
    jbcount: 10,
    jacount: 0,
    rbcount: 20,
    racount: 10,
    bbcount: 10,
    bacount: 1,
    sbcount: 10,
    sacount: 1,
    status: "processing",
  },
  {
    id: "0003",
    name: "조옥당 화명금곡점",
    type: "월보장",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-04-14"),
    keyword: "영덕맛집",
    rank: 4,
    pbcount: 100,
    pacount: 10,
    jbcount: 10,
    jacount: 0,
    rbcount: 20,
    racount: 10,
    bbcount: 10,
    bacount: 1,
    sbcount: 10,
    sacount: 1,
    status: "processing",
  },
  
]



export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "업체명",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "마감까지",
    cell: ({ row }) => {
      const endDate: Date = row.getValue("endDate");
      const daysLeft = endDate
        ? differenceInCalendarDays(new Date(endDate), new Date())
        : null;
  
      if (daysLeft === null) return <span className="text-muted">-</span>;
  
      if (daysLeft < 0) {
        return (
          <div className="flex items-center gap-1 text-red-500">
            <TriangleAlertIcon className="w-4 h-4" />
            마감 {Math.abs(daysLeft)}일 지남
          </div>
        );
      }
  
      if (daysLeft === 0) {
        return (
          <div className="flex items-center gap-1 text-orange-500 font-semibold">
            <AlarmClock className="w-4 h-4" />
            오늘 마감!
          </div>
        );
      }
  
      if (daysLeft <= 5) {
        return (
          <div className="flex items-center gap-1 text-yellow-500">
            <AlertTriangle className="w-4 h-4" />
            D-{daysLeft}
          </div>
        );
      }
  
      return (
        <div className="text-green-500 font-medium">
          D-{daysLeft}
        </div>
      );
    },
  }, 
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            진행기간
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
        const startDate: Date = row.getValue("startDate")
        const endDate: Date = row.getValue("endDate")

        return(
            <DatePickerWithRange 
                startDate={startDate}
                endDate={endDate}
                className="text-center"
                onChange={({startDate, endDate}) => {
                    console.log("📅 선택된 기간", startDate, endDate)
                }}
            />
        )
    },
  },
  {
    accessorKey: "keyword",
    header: () => <div className="text-right">키워드</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("ko-KR").format(amount/10000)+ '만원';

      return <div className="text-right font-medium">영덕맛집</div>
    },
  },
  {
    accessorKey: "rank",
    header: () => <div className="text-center">현재순위</div>,
    cell: ({ row }) => {
      
      return (
        <RankCard keyword="강남역 맛집" currentRank={3} previousRank={5} exposureDays={14} />
    )},
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">계약금액</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("ko-KR").format(amount/10000)+ '만원';

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>데이터</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="검색하기"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
