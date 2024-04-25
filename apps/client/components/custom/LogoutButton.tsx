import { logoutUserAction } from "@/data/actions/auth-action";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutUserAction}>
      <button type="submit">
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
}
