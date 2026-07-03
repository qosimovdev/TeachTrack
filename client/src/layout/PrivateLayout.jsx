import { AuthProvider } from "../provider/AuthProvider";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

function PrivateLayout() {
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-blobs">
        {/* Sidebar */}
        <aside className="hidden lg:block h-screen shrink-0">
          <Sidebar />
        </aside>

        {/* Main */}
        <main className="flex flex-1 flex-col h-screen overflow-hidden p-4">
          <div className="mb-4 shrink-0">
            <Header />
          </div>

          <section className="flex-1 overflow-y-auto app-text-primary px-2">
            <Outlet />
          </section>

          <div className="block lg:hidden mt-4 shrink-0">
            <BottomNav />
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default PrivateLayout;
