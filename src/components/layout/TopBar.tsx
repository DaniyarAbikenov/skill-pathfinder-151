import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="hover:bg-accent"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
