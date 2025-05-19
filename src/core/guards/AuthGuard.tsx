import { PublicRoutes } from "@/core/enums/routes";
import { useAppSelector } from "@/core/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = (): JSX.Element => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      to={PublicRoutes.LOGIN}
    />
  );
};