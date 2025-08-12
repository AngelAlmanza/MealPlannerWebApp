import { Loading } from '@/core/components/Loading'
import { RoutesWithNotFound } from '@/core/components/RoutesWithNotFound'
import { PrivateRoutes, PublicRoutes } from '@/core/enums/routes'
import { store } from '@/core/store/store'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { AuthGuard } from './core/guards/AuthGuard'
import './index.css'

const LoginPage = lazy(() => import("@/modules/auth/pages/Login"));
const Dashboard = lazy(() => import("@/modules/dashboard/pages/Dashboard"));
const Ingredients = lazy(() => import("@/modules/ingredients/pages/IngredientsPage"));
const IngredientsForm = lazy(() => import("@/modules/ingredients/pages/IngredientsForm"));
const RecipesPage = lazy(() => import("@/modules/recipes/pages/RecipesPage"));
const RecipesForm = lazy(() => import("@/modules/recipes/pages/RecipesForm"));
const RecipeDetail = lazy(() => import("@/modules/recipes/pages/RecipeDetail"));
const UnitMeasures = lazy(() => import("@/modules/unit-measures/pages/UnitMeasures"));
const UnitMeasuresForm = lazy(() => import("@/modules/unit-measures/pages/UnitMeasuresForm"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
            <Route element={<AuthGuard />}>
              <Route
                path={PublicRoutes.START}
                element={<Navigate to={PrivateRoutes.DASHBOARD} />}
              />
              <Route
                path={PrivateRoutes.DASHBOARD}
                element={<Dashboard />}
              />
              <Route
                path={PrivateRoutes.INGREDIENTS}
                element={<Ingredients />}
              />
              <Route
                path={PrivateRoutes.INGREDIENTS_CREATE}
                element={<IngredientsForm />}
              />
              <Route
                path={PrivateRoutes.INGREDIENTS_EDIT}
                element={<IngredientsForm />}
              />
              <Route
                path={PrivateRoutes.RECIPES}
                element={<RecipesPage />}
              />
              <Route
                path={PrivateRoutes.RECIPES_CREATE}
                element={<RecipesForm />}
              />
              <Route
                path={PrivateRoutes.RECIPES_EDIT}
                element={<RecipesForm />}
              />
              <Route
                path={PrivateRoutes.RECIPES_VIEW}
                element={<RecipeDetail />}
              />
              <Route
                path={PrivateRoutes.UNIT_MEASURES}
                element={<UnitMeasures />}
              />
              <Route
                path={PrivateRoutes.UNIT_MEASURES_CREATE}
                element={<UnitMeasuresForm />}
              />
              <Route
                path={PrivateRoutes.UNIT_MEASURES_EDIT}
                element={<UnitMeasuresForm />}
              />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}

export default App
