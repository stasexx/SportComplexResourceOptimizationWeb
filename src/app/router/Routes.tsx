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
import ServiceStatisticPage from "../../features/services/statistic/ServiceStatisticPage";
import UserDashboard from "../../features/users/dashboard/UserDashboard";
import UserReservationsDashboard from "../../features/users/reservations/dashboard/UserReservationsDashboard";
import EquipmentForm from "../../features/equipments/form/EquipmentForm";

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
            {path: 'sportcomplexes/:id/services/:seviceId', element: <EquipmentDashboard />},
            {path: 'login', element: <LoginForm />},
            {path: 'register', element: <RegisterForm />},
            {path: 'profiles/:username', element: <ProfilePage />},
            {path: 'statistic/userUsages/:userId', element: <UserUsageStatistic />},
            {path: 'sportcomplexes/:id/services/:id/serviceUsage/:id', element: <ServiceStatisticPage />},
            {path: 'sportcomplexes/:id/services/:seviceId/statistic/equipmentUsages/:id', element: <EquipmentStatisticPage />},
            {path: 'users', element: <UserDashboard />},
            {path: 'reservation/:id', element: <UserReservationsDashboard />},
            {path: 'sportcomplexes/:id/services/:seviceId/newEquipment', element: <EquipmentForm />}
        ]
    }
]

export const router = createBrowserRouter(routes);