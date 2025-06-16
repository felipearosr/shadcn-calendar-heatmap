// Traducido: src/components/data-table-es.tsx

"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconCircleCheckFilled,
  IconLoader,
} from "@tabler/icons-react"
import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

export const activitySchema = z.object({
  id: z.number(),
  timestamp: z.string(),
  tipo_documento: z.string(),
  nombre_paciente: z.string(),
  nombre_medico: z.string(),
  status: z.string(),
})

export type Activity = z.infer<typeof activitySchema>

const columnIdToName: Record<string, string> = {
  status: "Estado",
  timestamp: "Fecha y Hora",
  tipo_documento: "Tipo de Documento",
  nombre_paciente: "Paciente",
  nombre_medico: "Médico",
}

// Helper para renderizar una celda con un placeholder para valores vacíos
const renderCellWithPlaceholder =
  (placeholder: string = "No disponible") =>
  ({ getValue }: { getValue: () => any }) => {
    const value = getValue()
    // Si el valor es "falsy" (null, undefined, ""), muestra el placeholder
    return value ? (
      value
    ) : (
      <span className="text-muted-foreground italic">{placeholder}</span>
    )
  }

// Add display name to the component
renderCellWithPlaceholder.displayName = "RenderCellWithPlaceholder"

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "status",
    header: "Estado",
    cell: function StatusCell({ row }) {
      const status = row.getValue("status")
      const icon =
        status === "success" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader className="text-muted-foreground animate-spin" />
        )
      return (
        <Badge
          variant="outline"
          className="gap-x-2 text-muted-foreground px-1.5"
        >
          {icon}
          {status === "success" ? "Éxito" : "Fallido"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "timestamp",
    header: "Fecha y Hora",
    cell: function TimestampCell({ row }) {
      return new Date(row.getValue("timestamp")).toLocaleString()
    },
  },
  {
    accessorKey: "tipo_documento",
    header: "Tipo de Documento",
    cell: renderCellWithPlaceholder("Sin tipo"),
  },
  {
    accessorKey: "nombre_paciente",
    header: "Paciente",
    cell: renderCellWithPlaceholder("No especificado"),
  },
  {
    accessorKey: "nombre_medico",
    header: "Médico",
    cell: renderCellWithPlaceholder(),
  },
]

// El componente DataTable sigue siendo el mismo...
export function DataTable({ data }: { data: Activity[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full px-4 lg:px-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por paciente..."
          value={
            (table.getColumn("nombre_paciente")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("nombre_paciente")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <IconChevronDown className="ml-2 h-4 w-4" />
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
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnIdToName[column.id] ?? column.id}
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
                            header.getContext(),
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Paginación 
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
      */}
    </div>
  )
}