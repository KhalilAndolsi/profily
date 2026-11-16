import {
  Fingerprint,
  LogOut,
  Menu,
  PenBox,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "@base-ui/react";
import ToggleThemeButton from "./ToggleThemeButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { useAuth } from "./providers/auth-provider";

const Header = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="flex items-center justify-between px-4 py-2 md:px-8 md:py-4 rounded-full mx-4 lg:mx-12 my-4 sticky top-4 z-50 bg-background/20 backdrop-blur-md print:hidden">
      <Link to="/">
        <h1 className="flex items-center gap-1">
          <span className="aspect-square p-2 size-9 lg:size-10 flex items-center justify-center rounded-xl bg-primary text-white">
            <Fingerprint />
          </span>
          <span className="text-lg lg:text-2xl font-bold">Profily</span>
        </h1>
      </Link>

      <nav className="hidden md:flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link to="/templates">
          <Button variant="ghost">Templates</Button>
        </Link>
        <Link to="/examples">
          <Button variant="ghost">Examples</Button>
        </Link>
        <Link to="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>
      </nav>
      <Button
        variant="ghost"
        size="lg"
        className="md:hidden"
        aria-label="Open navigation menu"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu size={24} />
      </Button>
      <nav className="hidden md:flex items-center gap-2">
        <ToggleThemeButton />
        <Separator orientation="vertical" className="bg-muted h-6 w-0.5" />
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full p-1"
                  aria-label="Open account menu"
                />
              }
            >
              <Avatar size="lg">
                <AvatarImage
                  src={
                    user.avatar ||
                    "https://api.dicebear.com/10.x/lorelei/svg?seed=default"
                  }
                  alt={user.nickname || "User avatar"}
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/profile">
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link to="/dashboard">
                <DropdownMenuItem className={"whitespace-nowrap"}>
                  <PenBox />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              {user.role === "admin" && (
                <Link to="/admin/dashboard">
                  <DropdownMenuItem>
                    <ShieldCheck />
                    Admin dashboard
                  </DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0 bg-transparent hover:bg-transparent">
                <Button variant="destructive" className="w-full" onClick={signOut}>
                  <LogOut />
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to="/auth/login">
              <Button variant="outline" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="px-6" size="lg">
                Join Now <Sparkles />
              </Button>
            </Link>
          </>
        )}
      </nav>
      <Drawer
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        swipeDirection="right"
      >
        <DrawerContent className="h-dvh w-[min(85vw,20rem)] [--drawer-inset:0px] rounded-l-4xl rounded-r-none">
          <DrawerHeader className="p-6">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" onClick={closeMobileMenu}>
                <DrawerTitle className="flex items-center gap-2 text-left text-xl">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary p-1.5 text-white">
                    <Fingerprint />
                  </span>
                  Profily
                </DrawerTitle>
              </Link>
              <ToggleThemeButton />
            </div>
          </DrawerHeader>
          <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 pt-0">
            {isAuthenticated && (
              <div className="border-t pt-4 flex flex-col gap-2 items-start">
                <Link to="/profile" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-star">
                    <User />
                    Profile
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    <PenBox />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/admin/dashboard" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShieldCheck />
                    Admin dashboard
                  </Button>
                </Link>
              </div>
            )}
            <div className="border-t pt-4">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Application links
              </p>
              {[
                { label: "Home", to: "/" },
                { label: "Templates", to: "/templates" },
                { label: "Examples", to: "/examples" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to }) => (
                <Link key={to} to={to} onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
          <DrawerFooter className="p-6 pt-0">
            {isAuthenticated ? (
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={closeMobileMenu}
              >
                <LogOut />
                Sign out
              </Button>
            ) : (
              <>
                <Link to="/auth/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={closeMobileMenu}>
                  <Button className="w-full">
                    Join Now <Sparkles />
                  </Button>
                </Link>
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
