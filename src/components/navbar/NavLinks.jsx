"use client";

import React from "react";
import NavLink from "./NavLink";

/**
 * Desktop navigation links list
 */
const NavLinks = ({
  navItems = [],
  activeSection = "home",
  pathname = "/",
  onNavClick,
}) => {
  return (
    <div className="hidden items-center gap-5 lg:flex xl:gap-8">
      {navItems.map((item) => {
        const isActive =
          (item.href === "/" && pathname === "/" && activeSection === "home") ||
          (item.href !== "/" && pathname === item.href) ||
          (pathname === "/" && activeSection === item.id);

        return (
          <NavLink
            key={item.id}
            item={item}
            isActive={isActive}
            onClick={onNavClick}
          />
        );
      })}
    </div>
  );
};

export default NavLinks;
