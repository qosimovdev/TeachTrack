import { BellIcon, MessageCircle } from "lucide-react";
import { Input } from "../ui/input";
import useThemeStore from "@/store/useThemeStore";

function Header() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <header className="app-glass app-text-primary px-4 py-3 rounded-2xl flex items-center justify-between">
      <div>
        <Input
          type="text"
          placeholder="Search students, groups..."
          className="h-12 app-glass app-border-soft rounded-2xl px-4 py-2 w-80 input-theme"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-accent px-3 py-1 rounded-full">
          <button onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
        <div>
          <BellIcon />
        </div>
        <div>
          <MessageCircle />
        </div>
      </div>
    </header>
  );
}

export default Header;
