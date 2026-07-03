import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import useAuthStore from "@/store/authStore";

function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const teacherLinks = [
    {
      label: "Dashboard",
      path: "/teacher/dashboard",
    },
    {
      label: "Students",
      path: "/teacher/students",
    },
    {
      label: "Groups",
      path: "/teacher/groups",
    },
    {
      label: "Lessons",
      path: "/teacher/lessons",
    },
    {
      label: "Homework",
      path: "/teacher/homework",
    },
    {
      label: "Attendance",
      path: "/teacher/attendance",
    },
    {
      label: "Ranking",
      path: "/teacher/ranking",
    },
    {
      label: "Messages",
      path: "/teacher/messages",
    },
    {
      label: "Calendar",
      path: "/teacher/calendar",
    },
    {
      label: "Alerts",
      path: "/teacher/alerts",
    },
  ];

  const studentLinks = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
    },
    {
      label: "Lessons",
      path: "/student/lessons",
    },
    {
      label: "Homework",
      path: "/student/homework",
    },
    {
      label: "Attendance",
      path: "/student/attendance",
    },
    {
      label: "Ranking",
      path: "/student/ranking",
    },
    {
      label: "Calendar",
      path: "/student/calendar",
    },
    {
      label: "Messages",
      path: "/student/messages",
    },
    {
      label: "Profile",
      path: "/student/profile",
    },
  ];
  return (
    <aside className="relative w-64 app-glass h-full overflow-hidden app-text-primary px-4 py-3 ml-6 mt-4 mb-4 rounded-2xl ">
      <div>
        <h1 className="text-2xl font-bold pt-2 pb-6">TeachTrack</h1>
      </div>
      <nav>
        <ul className="space-y-2 mt-4">
          {(user?.role === "TEACHER" ? teacherLinks : studentLinks).map(
            (link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `
              flex items-center rounded-2xl px-4 py-2 text-base font-medium
              transition-all duration-300 
              ${
                isActive
                  ? `app-link app-border-strong`
                  : "app-text-secondary hover:app-glass hover:app-text-primary"
              }
            `
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-0 w-full px-4">
        <Button className="bg-accent text-theme px-4 py-2 rounded-full">
          Logout
        </Button>
        <div></div>
      </div>
    </aside>
  );
}

export default Sidebar;
