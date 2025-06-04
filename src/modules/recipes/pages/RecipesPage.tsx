import { Button } from "@/core/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { setSelectedRecipe } from "@/core/store/slices"
import { deleteRecipe, getRecipes } from "@/core/store/thunks/recipeThunks"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { CirclePlus, Ellipsis } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Recipe } from "../interfaces"

const breadcrumbLinks: BreadcrumbLinkType[] = [
  { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
  { label: "Recetas", href: PrivateRoutes.RECIPES },
]

function RecipesPage() {
  const columns: ColumnDef<Recipe>[] = [
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
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-wrap break-words text-ellipsis">
          {row.getValue("description")}
        </div>
      )
    },
    {
      accessorKey: "servings",
      header: "Porciones",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.getValue("servings")}
        </div>
      )
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
                <Ellipsis />
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
  ];

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { recipes } = useAppSelector((state) => state.recipes)

  const table = useReactTable({
    data: recipes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleEdit = (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe))
    navigate(PrivateRoutes.RECIPES_EDIT.replace(":id", recipe.id.toString()))
  }

  const handleDelete = (recipe: Recipe) => {
    dispatch(deleteRecipe(recipe.id))
  }

  const handleAdd = () => {
    dispatch(setSelectedRecipe(null))
    navigate(PrivateRoutes.RECIPES_CREATE)
  }

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadcrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadcrumbLinks[1]} hiddeSeparator />
      </SystemBreadcrumb>
      <div className="w-full flex items-center justify-end gap-4 mb-4">
        <Button onClick={handleAdd}>
          <CirclePlus /> Crear Receta
        </Button>
      </div>

      <div>
        <Table>
          <TableCaption>Recetas</TableCaption>
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

export default RecipesPage