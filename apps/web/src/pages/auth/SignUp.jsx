import React from "react";
import { Fingerprint, Key, PenBox, User } from "lucide-react";
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
import { useAuth } from "@/components/providers/auth-provider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validateForm = ({
  nickname,
  email,
  password,
  confirmPassword,
}) => {
  if (nickname.trim().length < 2 || nickname.trim().length > 50) {
    return "Nickname must be between 2 and 50 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Please enter a valid email address.";
  }

  if (password.length < 8 || password.length > 128) {
    return "Password must be between 8 and 128 characters.";
  }

  if (password !== confirmPassword) {
    return "Passwords must match.";
  }

  return null;
};

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(formData);
      navigate("/dashboard", { replace: true });
      // add toast notification for successful signup
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to create your account.",
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
          Create your online presence
        </CardTitle>
        <CardDescription>
          Join over creators and professionals building personal websites in minutes.
        </CardDescription>
        <CardContent className="mt-8 px-0 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-0.5">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              type="text"
              placeholder="your nickname"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="space-y-0.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
            />
            <Label
              htmlFor="terms"
              className="ml-2 text-muted-foreground text-xs inline"
            >
              I agree to the{" "}
              <Link to="/privacy-policy" className="max-sm:text-primary hover:text-primary inline">
                Terms of Service and Privacy Policy
              </Link>
            </Label>
          </div>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"} <PenBox />
          </Button>
          </form>
          <p className="text-center px-12">
            Already you have account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Sign in now
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
