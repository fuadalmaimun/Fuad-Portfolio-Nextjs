"use client";

import NavLink from "./navbar/NavLink";

export default function CompatNavLink(props) {
  // Support both legacy { href, label, isActive } and new { item, isActive, onClick }
  const item = props.item || { href: props.href, label: props.label, id: props.href };
  return <NavLink {...props} item={item} />;
}
