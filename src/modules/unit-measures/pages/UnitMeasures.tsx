import { Button } from "@/core/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { setSelectedUnitMeasure } from "@/core/store/slices/unitMeasuresSlice"
import { deleteUnitMeasure, getUnitMeasures } from "@/core/store/thunks/unitMeasureThunks"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { CirclePlus, Ellipsis } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UnitMeasures } from "../interfaces"

const breadcrumbLinks: BreadcrumbLinkType[] = [
  { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
  { label: "Unidades de medida", href: PrivateRoutes.UNIT_MEASURES },
]

function UnitMeasuresPage() {
  const columns: ColumnDef<UnitMeasures>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.getValue("name")}
        </div>
      )
    },
    {
      accessorKey: "abbreviation",
      header: "Abreviatura",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.getValue("abbreviation")}
        </div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(payment)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(payment)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { unitMeasures } = useAppSelector((state) => state.unitMeasures)

  const table = useReactTable({
    data: unitMeasures,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleEdit = (unitMeasure: UnitMeasures) => {
    dispatch(setSelectedUnitMeasure(unitMeasure))
    navigate(PrivateRoutes.UNIT_MEASURES_EDIT.replace(":id", unitMeasure.id.toString()))
  }

  const handleDelete = (unitMeasure: UnitMeasures) => {
    dispatch(deleteUnitMeasure(unitMeasure.id))
  }

  const handleAdd = () => {
    dispatch(setSelectedUnitMeasure(null))
    navigate(PrivateRoutes.UNIT_MEASURES_CREATE)
  }

  useEffect(() => {
    dispatch(getUnitMeasures())
  }, [dispatch])

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadcrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadcrumbLinks[1]} hiddeSeparator />
      </SystemBreadcrumb>
      <div className="w-full flex items-center justify-end gap-4 mb-4">
        <Button onClick={handleAdd}>
          <CirclePlus /> Crear Unidad de medida
        </Button>
      </div>
      <div>
        <Table>
          <TableCaption>Unidades de medida</TableCaption>
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
            {
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-secondary hover:text-secondary-foreground"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </PrivateLayout>
  )
}
export default UnitMeasuresPage