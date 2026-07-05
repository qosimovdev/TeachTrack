import Login from "../pages/auth/Login";
import Register from "@/pages/auth/Register";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PrivateLayout from "@/layout/PrivateLayout";
import Dashboard from "@/pages/teacher/dashboard/Dashboard";
import StudentDashboard from "@/pages/student/dashboard/StudentDashboard";
import Group from "@/pages/teacher/group/Group";

function AppRouter() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
            <Route element={<PrivateLayout />}>
              <Route path="/teacher/dashboard" element={<Dashboard />} />
              <Route path="/teacher/students" element={<div>Students</div>} />
              <Route path="/teacher/groups" element={<Group />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
            <Route element={<PrivateLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
            </Route>
          </Route>
          {/* <Route path="*" element={<Navigate to="/auth/login" replace />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouter;
