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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target }) => {
    setFormData((currentData) => ({
      ...currentData,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-0.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-0.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
            />
            <Label
              htmlFor="remember"
              className="ml-2 text-muted-foreground text-xs"
            >
              Remember me
            </Label>
          </div>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"} <Key />
          </Button>
          </form>
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
