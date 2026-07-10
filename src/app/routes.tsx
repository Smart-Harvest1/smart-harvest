import { createBrowserRouter } from "react-router";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainDashboard from "./screens/MainDashboard";
import EnergyManagement from "./screens/EnergyManagement";
import SoilAnalysisLab from "./screens/SoilAnalysisLab";
import PumpControlSystem from "./screens/PumpControlSystem";
import FacilityMonitoring from "./screens/FacilityMonitoring";
import UserAccessControl from "./screens/UserAccessControl";
import ConnectivitySettings from "./screens/ConnectivitySettings";
import NotificationCenter from "./screens/NotificationCenter";
import AnalyticsReports from "./screens/AnalyticsReports";
import AppLayout from "./components/AppLayout";
import TelemetryAdmin from "./screens/TelemetryAdmin";

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
    element: <AppLayout />,
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
      { path: "telemetry", element: <TelemetryAdmin /> },
    ],
  },
]);
