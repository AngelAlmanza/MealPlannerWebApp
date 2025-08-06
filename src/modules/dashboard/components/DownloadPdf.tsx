import { Button } from "@/core/components/ui/button"
import { Calendar } from "@/core/components/ui/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/core/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/core/components/ui/popover"
import { cn } from "@/core/lib/utils"
import { es } from "date-fns/locale"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { CalendarIcon, FileText } from "lucide-react"
import { useDownloadPdf } from "../hooks/useDownloadPdf"

dayjs.extend(utc);
dayjs.extend(timezone);

export const DownloadPdf = () => {
  const { date, setDate, handleDownload } = useDownloadPdf()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <FileText />
          Descargar PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generar Lista de compras</DialogTitle>
          <DialogDescription>
            Por favor selecciona el rango de fechas para generar la lista de compras.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {dayjs(date.from).format("MMM DD, YYYY")} -{" "}
                      {dayjs(date.to).format("MMM DD, YYYY")}
                    </>
                  ) : (
                    dayjs(date.from).format("MMM DD, YYYY")
                  )
                ) : (
                  <span>Selecciona un rango de fechas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end" usePortal={false}>
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Cerrar
            </Button>
          </DialogClose>
          <Button onClick={handleDownload}>
            <FileText />
            Generar PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
