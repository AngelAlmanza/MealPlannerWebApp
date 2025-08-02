import { PrivateLayout } from "@/core/layouts/PrivateLayout";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { AddMealItem } from "../components/AddMealItem";
import { useAppSelector } from "@/core/store/hooks";

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs)

function Dashboard() {
  const { mealPlanItems } = useAppSelector((state) => state.mealPlanItems);
  return (
    <PrivateLayout>
      <section className="flex items-center justify-between mb-4 px-12">
        <h1 className="text-2xl font-bold">Meal Planner</h1>
        <div className="flex items-center gap-2">
          <AddMealItem />
        </div>
      </section>
      <section>
        <Calendar
          localizer={localizer}
          events={mealPlanItems.map(item => ({
            title: item.recipe.name,
            start: dayjs(item.date).toDate(),
            end: dayjs(item.date).add(1, 'hour').toDate(),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          messages={{
            allDay: 'Todo el día',
            previous: 'Anterior',
            next: 'Siguiente',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            showMore: (total) => `+${total} más`,
            noEventsInRange: 'No hay eventos en este rango',
            tomorrow: 'Mañana',
            yesterday: 'Ayer',
            work_week: 'Semana laboral',
          }}
        />
      </section>
    </PrivateLayout>
  )
}

export default Dashboard