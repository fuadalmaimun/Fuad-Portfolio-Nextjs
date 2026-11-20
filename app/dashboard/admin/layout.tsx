import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAdminOtpStatus, getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { session, status } = await getAdminSession();
  if (status === 401) redirect("/sign-in?redirect=/dashboard/admin");
  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08050d] px-6 text-center text-white">
        <section className="max-w-md rounded-2xl border border-red-500/30 bg-[#0d071b] p-8">
          <h1 className="text-2xl font-bold">Access denied</h1>
          <p className="mt-3 text-base text-gray-300">Your account does not have administrator access.</p>
        </section>
      </main>
    );
  }
  const otp = await getAdminOtpStatus(session.session.token);
  if (!otp.verified) redirect("/verify-otp");
  return <div className="admin-dashboard">{children}</div>;
}
