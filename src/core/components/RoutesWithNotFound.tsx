import { NotFound } from "@/core/components/NotFound";
import { Route, Routes } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};