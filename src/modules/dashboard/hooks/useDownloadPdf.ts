import api from "@/core/lib/api";
import dayjs from "dayjs";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const useDownloadPdf = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs().toDate(),
    to: dayjs().add(7, "day").toDate(),
  });

  const handleDownload = async () => {
    const startDate = date?.from
      ? dayjs(date.from).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD");
    const endDate = date?.to
      ? dayjs(date.to).format("YYYY-MM-DD")
      : dayjs().add(7, "day").format("YYYY-MM-DD");

    const result = await api.post(
      "/pdf/generatePdf",
      {
        startDate,
        endDate,
      },
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([result.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `lista_compras_${startDate}_a_${endDate}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return {
    date,
    setDate,
    handleDownload,
  };
};
