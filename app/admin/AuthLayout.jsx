
import Link from "next/link";

export default function AuthLayout({ mode = "login" }) {
  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-[#080808] text-white md:grid md:grid-cols-2">

      {/* Left Side */}
      <div
        className="relative flex min-h-[280px] flex-col justify-between border-r border-white/10 bg-cover bg-center p-6 md:min-h-screen md:p-8"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,.95), rgba(0,0,0,.15)), url('/images/auth-bg.jpg')",
        }}
      >
        <Link href="/" className="text-lg font-semibold">
          Fuad Al Maimun<span className="text-gray-500">.</span>
        </Link>

        <div className="max-w-lg">
          <blockquote className="text-lg leading-8 text-gray-200">
            "Building modern digital experiences with
            creativity, passion, and clean code."
          </blockquote>

          <p className="mt-4 text-sm text-gray-400">
            Fuad Al Maimun
          </p>
          <p className="text-xs text-gray-500">
            Full Stack Developer
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative flex min-h-[550px] items-center justify-center px-6 py-16 md:min-h-screen">

        <Link
          href="/login"
          className="absolute right-8 top-6 text-sm text-gray-300 transition hover:text-white"
        >
          Sign In
        </Link>

        <div className="w-full max-w-sm">

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignup ? "Create an account" : "Welcome back"}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              {isSignup
                ? "Enter your email below to create your account"
                : "Enter your email below to sign in to your account"}
            </p>
          </div>

          <form className="space-y-2">

            <input
              type="email"
              placeholder="name@example.com"
              required
              className="h-10 w-full rounded-md border border-white/10 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
            />

            <button
              type="submit"
              className="h-10 w-full rounded-md bg-white text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Continue with Email
            </button>

          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/10 text-sm transition hover:bg-white/5"
          >
            <span className="font-bold">◉</span>
            GitHub
          </button>

          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>.
          </p>

        </div>
      </div>
    </div>
  );
}
