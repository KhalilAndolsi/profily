import { Fingerprint, Sparkles } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "../ui/button";
import ToggleThemeButton from "../ToggleThemeButton";
import { Separator } from "../ui/separator";

const PublicPageLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="border-t border-border bg-muted/30 px-4 py-6 print:hidden">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Fingerprint className="size-3!" size={18} />
            </span>
            <span>Powred by Profily</span>
          </Link>

          <nav className="flex items-center gap-2" aria-label="Profily navigation">
            <ToggleThemeButton />
            <Separator className="h-6 w-0.5"/>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link to="/">Home</Link>}
            />
            <Button
              nativeButton={false}
              render={<Link to="/auth/signup">Join now <Sparkles /></Link>}
            />
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default PublicPageLayout;
