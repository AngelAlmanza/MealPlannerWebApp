import { Button } from "@/core/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { setSelectedIngredient } from "@/core/store/slices"
import { deleteIngredient, getIngredients } from "@/core/store/thunks/ingredientThunks"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { CirclePlus, Funnel } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Ingredient } from "../interfaces"

const breadcrumbLinks: BreadcrumbLinkType[] = [
  { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
  { label: "Ingredientes", href: PrivateRoutes.INGREDIENTS },
]

function IngredientsPage() {
  const columns: ColumnDef<Ingredient>[] = [
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
      accessorKey: "unitMeasure",
      header: "Unidad de medida",
      cell: ({ row }) => {
        const unitMeasure = row.getValue("unitMeasure") as { name: string } | undefined;
        return (
          <div className="flex items-center gap-2">
            {unitMeasure?.name ?? "Sin unidad"}
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const record = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Funnel />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(record)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(record)}>
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
  const { ingredients } = useAppSelector((state) => state.ingredients)

  const table = useReactTable({
    data: ingredients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleEdit = (ingredient: Ingredient) => {
    dispatch(setSelectedIngredient(ingredient))
    navigate(PrivateRoutes.INGREDIENTS_EDIT.replace(":id", ingredient.id.toString()))
  }

  const handleDelete = (ingredient: Ingredient) => {
    dispatch(deleteIngredient(ingredient.id))
  }

  const handleAdd = () => {
    dispatch(setSelectedIngredient(null))
    navigate(PrivateRoutes.INGREDIENTS_CREATE)
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadcrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadcrumbLinks[1]} hiddeSeparator />
      </SystemBreadcrumb>
      <div className="w-full flex items-center justify-end gap-4 mb-4">
        <Button onClick={handleAdd}>
          <CirclePlus /> Crear Ingrediente
        </Button>

        <Button variant="secondary" size="icon">
          <Funnel />
        </Button>
      </div>

      <div>
        <Table>
          <TableCaption>Ingredientes</TableCaption>
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

export default IngredientsPage