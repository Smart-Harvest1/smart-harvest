import { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
const MainDashboard = lazy(() => import("./screens/MainDashboard"));
const EnergyManagement = lazy(() => import("./screens/EnergyManagement"));
const SoilAnalysisLab = lazy(() => import("./screens/SoilAnalysisLab"));
const PumpControlSystem = lazy(() => import("./screens/PumpControlSystem"));
const FacilityMonitoring = lazy(() => import("./screens/FacilityMonitoring"));
const UserAccessControl = lazy(() => import("./screens/UserAccessControl"));
const ConnectivitySettings = lazy(() => import("./screens/ConnectivitySettings"));
const NotificationCenter = lazy(() => import("./screens/NotificationCenter"));
const AnalyticsReports = lazy(() => import("./screens/AnalyticsReports"));
import AppLayout from "./components/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/signup",
    element: <SignUpScreen />,
  },
  {
    path: "/app",
    element: (
      <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading Farm Dashboard...</div>}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <MainDashboard /> },
      { path: "energy", element: <EnergyManagement /> },
      { path: "soil", element: <SoilAnalysisLab /> },
      { path: "pump", element: <PumpControlSystem /> },
      { path: "facility", element: <FacilityMonitoring /> },
      { path: "users", element: <UserAccessControl /> },
      { path: "settings", element: <ConnectivitySettings /> },
      { path: "notifications", element: <NotificationCenter /> },
      { path: "analytics", element: <AnalyticsReports /> },
    ],
  },
]);
