import { PrivateLayout } from "@/core/layouts/PrivateLayout";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { AddMealItem } from "../components/AddMealItem";
import { CALENDAR_MESSAGES } from "../constants/messages";
import { useCalendar } from "../hooks/useCalendar";
import { DownloadPdf } from "../components/DownloadPdf";

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs)

function Dashboard() {
  const { events, currentView, handleSelectEvent, handleViewChange } = useCalendar();

  return (
    <PrivateLayout>
      <section className="flex items-center justify-between mb-4 px-12">
        <h1 className="text-2xl font-bold">Meal Planner</h1>
        <div className="flex items-center gap-2">
          <AddMealItem />
          <DownloadPdf />
        </div>
      </section>
      <section>
        <Calendar
          localizer={localizer}
          events={events}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          messages={CALENDAR_MESSAGES}
          onView={handleViewChange}
          view={currentView}
          views={['month', 'week', 'day']}
        />
      </section>
    </PrivateLayout>
  )
}

export default Dashboard