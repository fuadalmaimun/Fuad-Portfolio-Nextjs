"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session, isPending } = authClient.useSession();

  const requestedRedirect = searchParams.get("redirect");
  const redirectUrl =
    requestedRedirect?.startsWith("/") && !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/dashboard/admin";

  // Redirect already logged-in users
  useEffect(() => {
    if (!isPending && session?.user) {
      if (session.user.role === "admin") {
        fetch("/api/admin/api/auth/otp/status", { cache: "no-store" })
          .then((response) => response.json())
          .then((status) => router.replace(status.verified ? redirectUrl : "/verify-otp"))
          .catch(() => router.replace("/verify-otp"));
      } else {
        router.replace("/");
      }
    }
  }, [session, isPending, router, redirectUrl]);

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password");
        return;
      }

      const user = res.data?.user;

      if (user?.role === "admin") {
        const otp = await fetch("/api/admin/api/auth/otp/request", { method: "POST" });
        const result = await otp.json().catch(() => ({}));
        if (!otp.ok && otp.status !== 429) {
          setError(result.message || "Could not send the verification code.");
          return;
        }
        router.replace(result.verified ? redirectUrl : "/verify-otp");
      } else {
        router.replace("/");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading screen
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#080B09] flex items-center justify-center">
        <Loader2
          size={30}
          className="animate-spin text-emerald-500"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080B09] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Logo and Heading */}
        <div className="text-center mb-10">

          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <ShieldCheck
              size={28}
              className="text-emerald-400"
            />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Sign in to manage your portfolio
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-[#101512] border border-white/10 rounded-2xl p-7 sm:p-9 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Input */}
            <div className="space-y-2">

              <label className="block text-sm font-medium text-gray-300">
                Email Address
              </label>

              <div className="flex items-center h-14 rounded-xl border border-white/10 bg-[#080B09] overflow-hidden transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10">

                <div className="w-12 h-full flex items-center justify-center border-r border-white/10 shrink-0">
                  <Mail
                    size={19}
                    className="text-emerald-500"
                  />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                  className="flex-1 min-w-0 h-full px-4 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                />

              </div>

            </div>

            {/* Password Input */}
            <div className="space-y-2">

              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="flex items-center h-14 rounded-xl border border-white/10 bg-[#080B09] overflow-hidden transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10">

                <div className="w-12 h-full flex items-center justify-center border-r border-white/10 shrink-0">
                  <Lock
                    size={19}
                    className="text-emerald-500"
                  />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="flex-1 min-w-0 h-full px-4 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-full px-4 flex items-center justify-center text-gray-500 hover:text-emerald-400 transition-colors shrink-0"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">

                <AlertCircle
                  size={17}
                  className="shrink-0"
                />

                <p>{error}</p>

              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>

          {/* Security Information */}
          <div className="mt-7 pt-6 border-t border-white/10 text-center">

            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <ShieldCheck
                size={15}
                className="text-emerald-500"
              />
              Secure Admin Authentication
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Admin accounts are created by an existing administrator.
            </p>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-7">
          © {new Date().getFullYear()} Fuad Al Maimun. All rights reserved.
        </p>

      </div>

    </main>
  );
}

export default function SignIn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080B09] flex items-center justify-center">
          <Loader2
            size={30}
            className="animate-spin text-emerald-500"
          />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
