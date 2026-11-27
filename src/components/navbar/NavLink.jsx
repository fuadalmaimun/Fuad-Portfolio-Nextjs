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
      className={`group relative py-2 text-sm font-medium transition-colors duration-300 ${
        isActive ? "text-purple-300" : "text-slate-400 hover:text-white"
      }`}
    >
      {item.label}

      <span
        className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 transition-all duration-300 ${
          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
      />
    </Link>
  );
};

export default NavLink;
