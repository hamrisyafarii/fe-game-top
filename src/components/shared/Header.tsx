import { Gamepad2, User, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Gamepad2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-gaming text-xl font-bold text-foreground">
            GAME<span className="text-primary">TOP</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {!isAdmin && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
          )}

          {isAdmin && (
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Gamepad2 className="h-4 w-4" />
                <span className="hidden sm:inline">Store</span>
              </Button>
            </Link>
          )}

          <Button variant="outline" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
