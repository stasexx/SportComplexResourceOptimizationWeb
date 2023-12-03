import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import SportComplexDashboard from "../../features/sportcomplexes/dashboard/SportComplexDashboard";
import HomePage from "../../features/home/HomePage";
import SportComplexForm from "../../features/sportcomplexes/form/SportComplexForm";
import SportComplexDetails from "../../features/sportcomplexes/details/SportComplexDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'sportcomplexes', element: <SportComplexDashboard />},
            {path: 'sportcomplexes/:id', element: <SportComplexDetails />},
            {path: 'create/sportcomplexes', element: <SportComplexForm key="create" />},
            {path: 'update/sportcomplexes/:id', element: <SportComplexForm key="update" />}
        ]
    }
]

export const router = createBrowserRouter(routes);