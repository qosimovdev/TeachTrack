import { useAuthInit } from "@/hook/auth/useAuthHint";

export function AuthProvider({ children }) {
  useAuthInit();
  return children;
}
