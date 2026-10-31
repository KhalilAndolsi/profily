import { Fingerprint, Menu, Moon, Sparkles, Sun } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "@base-ui/react";
import ToggleThemeButton from "./ToggleThemeButton";

const Header = () => {
  
  return (
    <header className="flex items-center justify-between px-8 py-4 rounded-full mx-4 lg:mx-12 my-4 sticky top-4 z-50 bg-background/20 backdrop-blur-md">
      <Link to="/">
        <h1 className="flex items-center gap-1">
          <span className="aspect-square p-2 size-9 lg:size-10 flex items-center justify-center rounded-xl bg-primary text-white">
            <Fingerprint />
          </span>
          <span className="text-lg lg:text-2xl font-bold">Profily</span>
        </h1>
      </Link>

      <nav className="hidden lg:flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost">Templates</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost">Examples</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost">Contact</Button>
        </Link>
      </nav>
      <Button variant="ghost" size="lg" className="md:hidden">
        <Menu size={24} />
      </Button>
      <nav className="hidden md:flex items-center gap-2">
        <ToggleThemeButton />
        <Separator orientation="vertical" className="bg-muted h-6 w-0.5" />
        <Button variant="outline" className="hidden lg:flex">
          Sign In
        </Button>
        <Button className="px-6" size="lg">
          Join Now <Sparkles />
        </Button>
      </nav>
    </header>
  );
};

export default Header;
