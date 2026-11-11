import React from "react";
import { Fingerprint, Key } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="hidden sm:flex items-center gap-1">
        <span className="aspect-square p-2 size-9 lg:size-10 flex items-center justify-center rounded-xl bg-primary text-white">
          <Fingerprint />
        </span>
        <span className="text-lg lg:text-2xl font-bold">Profily</span>
      </h1>
      <Card className="w-[90vw] md:w-3xl max-w-md p-8 mt-8 gap-0">
        <CardTitle className="text-xl font-bold mb-0">
          Sign in to your account
        </CardTitle>
        <CardDescription>
          Enter your email and password to access your workspaces and live
          pages.
        </CardDescription>
        <CardContent className="mt-8 px-0 space-y-6">
          <div className="space-y-0.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="you@example.com" id="email" />
          </div>
          <div className="space-y-0.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" placeholder="••••••••" id="password" />
          </div>
          <div className="flex items-center">
            <Checkbox id="remember" />
            <Label
              htmlFor="remember"
              className="ml-2 text-muted-foreground text-xs"
            >
              Remember me
            </Label>
          </div>
          <Button className="w-full" size="lg">
            Sign In <Key />
          </Button>
          <p className="text-center px-12">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Sign up for free
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
