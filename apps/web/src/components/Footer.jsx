import { Fingerprint } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import ToggleThemeButton from "./ToggleThemeButton";

const Footer = () => {
  return (
    <footer className="container mx-auto px-6 py-6 sm:px-10 lg:px-16 flex gap-6 flex-col lg:flex-row items-center justify-center lg:justify-between">
      <div className="flex items-center justify-center flex-wrap max-sm:flex-col gap-2">
        <Link to="/">
          <h1 className="flex items-center gap-1">
            <span className="aspect-square p-1.5 size-7 flex items-center justify-center rounded-lg bg-primary text-white">
              <Fingerprint />
            </span>
            <span className="text-md font-bold">Profily</span>
          </h1>
        </Link>
        <Separator className="h-6 w-0.5 max-sm:hidden" />
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Profily SaaS Inc. Developed by{" "}
          <a
            target="_blank"
            href="https://github.com/KhalilAndolsi"
            className="hover:underline"
          >
            Khalil Andolsi
          </a>
        </p>
      </div>
      <nav className="flex items-center justify-center flex-wrap gap-4">
        <Link to="/">
          <Button variant="ghost">Landing page</Button>
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
        <ToggleThemeButton />
      </nav>
    </footer>
  );
};

export default Footer;
