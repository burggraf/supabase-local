import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import LandingPage from "@/pages/landing"
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"
import RecoveryPage from "@/pages/recovery"
import ResetPasswordPage from "@/pages/reset-password"
import DashboardPage from "@/pages/dashboard"
import ProfilePage from "@/pages/profile"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
