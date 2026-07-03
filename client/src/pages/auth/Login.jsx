import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hook/auth/useLogin";
import { useState } from "react";

function Login() {
  const { mutate, isPending } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="min-h-screen bg-blobs flex items-center justify-center px-4">
      <Card className="app-glass-strong w-full max-w-md rounded-[30px] border-none">
        <CardContent className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold app-text-primary">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm app-text-secondary">
              Sign in to continue your teaching journey
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="app-text-secondary">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="teacher@example.com"
                className="h-12 rounded-2xl app-glass app-border-soft input-theme"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="app-text-secondary">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="h-12 rounded-2xl app-glass app-border-soft input-theme"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm hover:opacity-80 transition app-text-secondary dashboard-text"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-white font-semibold dashboard"
              style={{
                boxShadow: "var(--app-shadow-lift)",
              }}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm app-text-secondary">
              Don't have an account?{" "}
              <span className="font-medium cursor-pointer dashboard-text">
                Register
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
