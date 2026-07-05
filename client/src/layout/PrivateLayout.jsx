import { AuthProvider } from "../provider/AuthProvider";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import AddGroupModal from "@/components/common/groups/CreateGroupModal";
import useModalStore from "@/store/useModalStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function PrivateLayout() {
  const { modalType, closeModal, isOpen } = useModalStore();

  const renderModal = () => {
    switch (modalType) {
      case "group":
        return <AddGroupModal />;
      default:
        return null;
    }
  };
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

      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent>{renderModal()}</DialogContent>
      </Dialog>
    </AuthProvider>
  );
}

export default PrivateLayout;
