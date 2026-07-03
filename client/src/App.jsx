import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        expand
        toastOptions={{
          classNames: {
            toast: "!border-none !shadow-lg",
            title: "!text-white font-medium",
            description: "!text-white/90",

            success: "!bg-[#22C55E] !text-white",
            error: "!bg-[#EF4444] !text-white",
            warning: "!bg-[#F59E0B] !text-white",
            info: "!bg-[#4F46E5] !text-white",
          },
        }}
      />
    </>
  );
}

export default App;
