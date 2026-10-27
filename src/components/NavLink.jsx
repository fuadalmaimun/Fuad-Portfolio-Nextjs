
const NavLink = ({ href, label, isActive }) => {
  const handleClick = (e) => {
    e.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={isActive ? "location" : undefined}
      className={`group relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive
          ? "text-white"
          : "text-slate-500 hover:text-slate-200"
      }`}
    >
      {label}

      {/* Active underline */}
      <span
        className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 transition-all duration-300 ${
          isActive
            ? "w-5 opacity-100"
            : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-70"
        }`}
      />

      {/* Active glow */}
      {isActive && (
        <span className="absolute inset-x-0 bottom-0 -z-10 mx-auto h-5 w-8 bg-purple-500/10 blur-lg" />
      )}
    </a>
  );
};

export default NavLink;
