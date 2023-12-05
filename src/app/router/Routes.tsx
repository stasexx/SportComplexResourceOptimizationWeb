import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import SportComplexDashboard from "../../features/sportcomplexes/dashboard/SportComplexDashboard";
import HomePage from "../../features/home/HomePage";
import SportComplexForm from "../../features/sportcomplexes/form/SportComplexForm";
import SportComplexDetails from "../../features/sportcomplexes/details/SportComplexDetails";
import LoginForm from "../../features/users/LoginForm";
import ServiceDashboard from "../../features/services/dashboard/ServiceDashboard";
import EquipmentDashboard from "../../features/equipments/dashboard/EquipmentDashboard";
import RegisterForm from "../../features/users/RegisterForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import UserUsageStatistic from "../../features/users/UserUsageStatistic";
import EquipmentStatisticPage from "../../features/equipments/statistic/EquipmentStatisticPage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'sportcomplexes', element: <SportComplexDashboard />},
            {path: 'sportcomplexes/:id', element: <SportComplexDetails />},
            {path: 'create/sportcomplexes', element: <SportComplexForm key="create" />},
            {path: 'update/sportcomplexes/:id', element: <SportComplexForm key="update" />},
            {path: 'sportcomplexes/:id/services', element: <ServiceDashboard />},
            {path: 'sportcomplexes/:id/services/:id', element: <EquipmentDashboard />},
            {path: 'login', element: <LoginForm />},
            {path: 'register', element: <RegisterForm />},
            {path: 'profiles/:username', element: <ProfilePage />},
            {path: 'statistic/userUsages/:userId', element: <UserUsageStatistic />},
            {path: 'sportcomplexes/:id/services/:id/statistic/equipmentUsages/:id', element: <EquipmentStatisticPage />}
        ]
    }
]

export const router = createBrowserRouter(routes);