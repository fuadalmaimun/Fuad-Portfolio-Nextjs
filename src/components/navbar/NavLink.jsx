"use client";

import React from "react";
import Link from "next/link";

/**
 * Desktop individual navigation link
 */
const NavLink = ({ item, isActive, onClick }) => {
  return (
    <Link
      href={item.href}
      onClick={(e) => onClick?.(e, item)}
      className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
        isActive ? "text-purple-300" : "text-slate-400 hover:text-white"
      }`}
    >
      {item.label}

      {isActive && (
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-purple-400" />
      )}
    </Link>
  );
};

export default NavLink;
