"use client";

import React from "react";
import MobileNavLink from "./MobileNavLink";

/**
 * Mobile navigation links list
 */
const MobileNavLinks = ({
  navItems = [],
  activeSection = "home",
  pathname = "/",
  isOpen = false,
  onNavClick,
}) => {
  return (
    <div className="space-y-1">
      {navItems.map((item, index) => {
        const isActive =
          (item.href === "/" && pathname === "/" && activeSection === "home") ||
          (item.href !== "/" && pathname === item.href) ||
          (pathname === "/" && activeSection === item.id);

        return (
          <MobileNavLink
            key={item.id}
            item={item}
            isActive={isActive}
            isOpen={isOpen}
            index={index}
            onClick={onNavClick}
          />
        );
      })}
    </div>
  );
};

export default MobileNavLinks;
