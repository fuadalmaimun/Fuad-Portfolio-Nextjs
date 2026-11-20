"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function VerifyOtpPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isPending && !session) router.replace("/sign-in?redirect=/dashboard/admin");
    if (!isPending && session?.user?.role !== "admin") router.replace("/");
    if (session?.user?.role === "admin") {
      fetch("/api/admin/api/auth/otp/status", { cache: "no-store" })
        .then((response) => response.json())
        .then((result) => {
          if (result.verified) router.replace("/dashboard/admin");
          setSeconds(result.retryAfter || 0);
        });
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      if (!response.ok) setError(result.message || "Verification failed.");
      else router.replace("/dashboard/admin");
    } catch {
      setError("Could not verify the code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setError("");
    try {
      const response = await fetch("/api/admin/api/auth/otp/resend", { method: "POST" });
      const result = await response.json();
      if (!response.ok) setError(result.message || "Could not resend the code.");
      setSeconds(result.retryAfter || (response.ok ? 60 : 0));
    } catch {
      setError("Could not resend the code. Please try again.");
    }
  }

  if (isPending || !session) return <main className="min-h-screen bg-[#080B09] flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" /></main>;

  return (
    <main className="min-h-screen bg-[#080B09] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><ShieldCheck size={28} className="text-emerald-400" /></div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Verify your email</h1>
          <p className="text-gray-400 mt-2 text-sm">Enter the 6-digit code sent to the configured verification inbox.</p>
        </header>
        <section className="bg-[#101512] border border-white/10 rounded-2xl p-7 sm:p-9 shadow-2xl">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080B09] p-4 text-sm text-gray-300"><Mail size={18} className="text-emerald-500 shrink-0" /><span>Code expires in 5 minutes.</span></div>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <label className="block text-sm font-medium text-gray-300" htmlFor="otp-code">Verification code</label>
            <input id="otp-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="000000" className="h-14 w-full rounded-xl border border-white/10 bg-[#080B09] px-4 text-center text-2xl tracking-[0.5em] text-white outline-none placeholder:text-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10" />
            {error && <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"><AlertCircle size={17} className="shrink-0" />{error}</div>}
            <button type="submit" disabled={loading || code.length !== 6} className="w-full h-14 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all disabled:opacity-60">{loading ? <><Loader2 size={18} className="animate-spin" />Verifying...</> : <>Verify and continue<ArrowRight size={18} /></>}</button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-400">Didn’t receive it? <button type="button" disabled={seconds > 0} onClick={resend} className="font-semibold text-emerald-400 disabled:text-gray-600">{seconds > 0 ? `Resend in ${seconds}s` : "Resend code"}</button></div>
        </section>
      </div>
    </main>
  );
}
