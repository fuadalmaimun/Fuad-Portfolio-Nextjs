"use client";

import React from "react";
import Link from "next/link";

/**
 * Mobile individual navigation link
 */
const MobileNavLink = ({
  item,
  isActive,
  isOpen = false,
  index = 0,
  onClick,
}) => {
  return (
    <Link
      href={item.href}
      tabIndex={isOpen ? 0 : -1}
      onClick={(e) => onClick?.(e, item)}
      className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3.5 transition-all duration-200 ${
        isActive
          ? "border-purple-500/20 bg-purple-500/10 text-purple-300"
          : "border-transparent bg-transparent text-slate-300 hover:border-purple-500/20 hover:bg-purple-500/10 hover:text-white"
      }`}
      style={{
        transitionDelay: isOpen ? `${index * 30}ms` : "0ms",
      }}
    >
      <span className="flex items-center gap-3">
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            isActive ? "bg-purple-400" : "bg-slate-600 group-hover:bg-purple-400"
          }`}
        />
        <span className="text-sm font-medium">{item.label}</span>
      </span>

      <span
        className={`text-xs transition-transform duration-200 ${
          isActive
            ? "translate-x-0 text-purple-300"
            : "-translate-x-1 text-slate-600 group-hover:translate-x-0 group-hover:text-purple-300"
        }`}
      >
        →
      </span>
    </Link>
  );
};

export default MobileNavLink;
