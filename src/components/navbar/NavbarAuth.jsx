"use client";

import React from "react";
import Link from "next/link";
import { Shield, User, LogOut } from "lucide-react";

/**
 * Navbar authentication controls:
 * - Admin logged in: shows Dashboard link & Sign out
 * - User logged in: shows Sign out
 * - Not logged in: shows the admin sign-in entry point
 */
const NavbarAuth = ({
  isAdmin = false,
  session = null,
  onSignOut,
  isMobile = false,
  onClose,
}) => {
  if (!session?.user) {
    // Icon-only admin entry point (same in desktop navbar and mobile menu)
    const loginLink = (
      <Link
        href="/login?redirect=/dashboard/admin"
        onClick={onClose}
        title="Admin login"
        aria-label="Admin login"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/40 bg-purple-950/40 text-purple-200 transition hover:border-purple-400 hover:bg-purple-600/30"
      >
        <Shield size={16} className="text-purple-400" />
      </Link>
    );

    return isMobile ? (
      <div className="mt-4 border-t border-white/10 pt-4">{loginLink}</div>
    ) : (
      loginLink
    );
  }

  if (isMobile) {
    return (
      <div className="mt-4 border-t border-white/10 pt-4">
        {isAdmin ? (
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/admin"
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/40 px-4 py-2.5 text-xs font-semibold text-purple-200 transition hover:border-purple-400 hover:bg-purple-600/30"
            >
              <Shield size={14} className="text-purple-400" />
              <span>Admin Dashboard</span>
            </Link>
            <button
              onClick={() => {
                onClose?.();
                onSignOut?.();
              }}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              onClose?.();
              onSignOut?.();
            }}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
          >
            <User size={14} />
            <span>Sign Out ({session.user.name})</span>
          </button>
        )}
      </div>
    );
  }

  // Desktop view
  return (
    <div className="flex items-center gap-2">
      {isAdmin ? (
        <>
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-950/40 px-3.5 py-1.5 text-xs font-semibold text-purple-200 transition hover:border-purple-400 hover:bg-purple-600/30"
          >
            <Shield size={13} className="text-purple-400" />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={onSignOut}
            title="Sign out"
            aria-label="Sign out"
            className="rounded-full p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={16} />
          </button>
        </>
      ) : (
        <button
          onClick={onSignOut}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
        >
          <User size={13} />
          <span>Sign Out</span>
        </button>
      )}
    </div>
  );
};

export default NavbarAuth;
