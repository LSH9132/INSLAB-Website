"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { SiteUtilityBar } from "./site-utility-bar";

import type { NavData } from "@/types/messages";

type SiteHeaderProps = {
  currentPath?: string;
  nav: NavData;
};

type NavKey = "home" | "research" | "publications" | "team" | "contact";

const navOrder: NavKey[] = ["home", "research", "publications", "team", "contact"];

const navHrefs: Record<NavKey, string> = {
  home: "/",
  research: "/research",
  publications: "/publications",
  team: "/team",
  contact: "/contact",
};

const navActivePaths: Partial<Record<NavKey, string[]>> = {
  home: ["/"],
  research: ["/research"],
  publications: ["/publications"],
  team: ["/team", "/director", "/join", "/news"],
  contact: ["/contact"],
};

/** Nav keys that have expandable sub-links in the mobile menu */
const navKeysWithSubLinks: NavKey[] = ["research", "team"];

const sectionHrefs: Record<NavKey, string[][]> = {
  home: [
    ["/", "/#mission"],
    ["/#research-areas", "/contact"],
  ],
  research: [
    ["/research#intelligent-networking", "/research#distributed-ai"],
    ["/research#cyber-physical-systems", "/publications"],
  ],
  publications: [
    ["/publications", "/publications"],
    ["/publications", "/publications"],
  ],
  team: [
    ["/team", "/director"],
    ["/join", "/news"],
  ],
  contact: [
    ["/contact", "/contact"],
    ["/publications", "/"],
  ],
};

/* ── Animation constants (Linear/Vercel style) ── */

const dropdownSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 32,
  mass: 0.8,
};

const layoutSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

const sectionContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.04 },
  },
};

const sectionItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

/** Animated hamburger / close icon */
function MenuToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <motion.path
        animate={isOpen ? { d: "M 4 4 L 20 20" } : { d: "M 4 7 L 20 7" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
      <motion.path
        animate={isOpen ? { opacity: 0 } : { opacity: 1, d: "M 4 12 L 20 12" }}
        transition={{ duration: 0.15 }}
      />
      <motion.path
        animate={isOpen ? { d: "M 4 20 L 20 4" } : { d: "M 4 17 L 20 17" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function SiteHeader({ currentPath, nav }: SiteHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [shouldShowUtilityBar, setShouldShowUtilityBar] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [expandedMobileKey, setExpandedMobileKey] = useState<NavKey | null>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const normalizedPath = currentPath;

  const activeMenu = activeMenuId
    ? navOrder.find((key) => key === activeMenuId) ?? null
    : null;

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        if (navBarRef.current) {
          navBarRef.current.style.boxShadow =
            currentScrollY > 8 ? "0 4px 24px rgba(15,23,42,0.08)" : "none";
        }

        if (currentScrollY <= 16) {
          setShouldShowUtilityBar(true);
        } else if (delta > 4) {
          // Scrolling down past deadzone → hide
          setShouldShowUtilityBar(false);
        } else if (delta < -4) {
          // Scrolling up past deadzone → show
          setShouldShowUtilityBar(true);
        }
        // Within ±4px deadzone → do nothing (prevents jitter)

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close dropdown on Escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenuId(null);
    },
    [],
  );

  useEffect(() => {
    if (activeMenuId) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [activeMenuId, handleEscape]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility bar — animates height so no blank space is left when hidden */}
      <motion.div
        initial={false}
        animate={shouldShowUtilityBar ? { height: 28, opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <SiteUtilityBar announcements={nav.announcements ?? []} />
      </motion.div>

      {/* Main nav bar — CSS shadow via ref, no motion re-render on scroll */}
      <div
        ref={navBarRef}
        className="border-b border-slate-100 bg-white/95 backdrop-blur-sm transition-shadow duration-300"
      >
        <div
          className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"
          onMouseLeave={() => setActiveMenuId(null)}
        >
          {/* Logo */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/images/logo-inslab-black-transparent-v1.png"
                alt="INSLAB logo"
                width={40}
                height={40}
                className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                priority
              />
              <div className="flex flex-col justify-center gap-[5px] py-1">
                <span className="text-[1.1rem] font-black leading-none tracking-wider text-slate-900 transition-colors group-hover:text-slate-700">
                  INSLAB
                </span>
                <span className="flex items-center gap-[4px] text-[0.575rem] font-light leading-none tracking-[0.22em] text-slate-600 transition-colors group-hover:text-slate-500">
                  <span>Intelligence</span>
                  <span>Network</span>
                  <span className="text-slate-500">&</span>
                  <span>System</span>
                  <span className="text-slate-500">.</span>
                  <span>Lab</span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop nav + utilities */}
          <div className="hidden flex-1 items-center justify-end gap-8 lg:flex">
            {/* Nav links */}
            <LayoutGroup>
              <nav className="relative flex items-center gap-1">
                {navOrder.map((key, i) => {
                  const item = nav[key];
                  const isActive = navActivePaths[key]?.includes(normalizedPath ?? "") ?? false;
                  const isOpen = activeMenuId === key;

                  return (
                    <motion.div
                      key={key}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                      className="relative"
                    >
                      <Link
                        href={navHrefs[key]}
                        onMouseEnter={() => setActiveMenuId(key)}
                        onFocus={() => setActiveMenuId(key)}
                        className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                          isActive || isOpen
                            ? "text-slate-900"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        <span className="relative">{item.label}</span>
                        {/* Sliding underline indicator */}
                        {(isOpen || isActive) && (
                          <motion.span
                            layoutId="nav-underline"
                            aria-hidden="true"
                            className="absolute inset-x-1 -bottom-1 h-[2px] rounded-full bg-slate-900"
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </LayoutGroup>

            {/* Search box with expand animation */}
            <motion.div
              animate={{ width: isSearchFocused ? 280 : 220 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="relative"
            >
              <motion.div
                animate={
                  isSearchFocused
                    ? { borderColor: "rgb(100 116 139)", boxShadow: "0 0 0 2px rgba(100,116,139,0.15)" }
                    : { borderColor: "rgb(229 231 235)", boxShadow: "0 0 0 0px rgba(100,116,139,0)" }
                }
                transition={{ duration: 0.2 }}
                className="flex w-full items-center rounded-md border bg-gray-50 px-3 py-1.5"
              >
                <motion.svg
                  animate={{ color: isSearchFocused ? "rgb(100 116 139)" : "rgb(156 163 175)" }}
                  transition={{ duration: 0.2 }}
                  className="h-[18px] w-[18px] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </motion.svg>
                <input
                  type="text"
                  placeholder={nav.searchPlaceholder}
                  aria-label={nav.searchPlaceholder}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full border-none bg-transparent px-2 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none"
                />
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.kbd
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="flex-shrink-0 rounded border border-slate-200 bg-white px-1 py-0.5 text-[9px] font-medium tracking-wide text-slate-400"
                    >
                      ESC
                    </motion.kbd>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Join Us CTA */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            >
              <Link
                href="/join"
                className="flex h-9 min-w-[80px] items-center justify-center overflow-hidden rounded-md bg-slate-900 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                <span className="truncate">{nav.joinUs}</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="p-2 text-slate-900 lg:hidden"
            aria-label={isMenuOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <MenuToggleIcon isOpen={isMenuOpen} />
          </motion.button>

          {/* Desktop mega menu dropdown — Linear/Vercel style */}
          <AnimatePresence>
            {activeMenu ? (
              <>
                {/* Subtle backdrop overlay */}
                <motion.div
                  key="dropdown-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none fixed inset-x-0 top-0 z-30 hidden h-screen bg-black/[0.03] lg:block"
                  aria-hidden="true"
                />

                {/* Dropdown panel */}
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={dropdownSpring}
                  className="absolute top-full right-0 left-0 z-50 hidden origin-top pt-2 lg:block"
                >
                  <motion.div
                    layout
                    transition={{ layout: layoutSpring }}
                    className="overflow-hidden rounded-xl border border-slate-200/60 bg-white/98 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-xl"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMenuId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                      >
                        <div className="grid grid-cols-[1fr_0.45fr] gap-6 p-5 lg:p-6">
                          {/* Left: Sections with stagger */}
                          <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            variants={sectionContainerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {nav[activeMenu].sections.map(
                              (
                                section: {
                                  title: string;
                                  links: { label: string; description: string }[];
                                },
                                si: number,
                              ) => (
                                <div key={section.title}>
                                  <h2 className="mb-2.5 text-xs font-medium text-slate-400">
                                    {section.title}
                                  </h2>
                                  <div className="space-y-1">
                                    {section.links.map(
                                      (
                                        link: { label: string; description: string },
                                        li: number,
                                      ) => (
                                        <motion.div
                                          key={link.label}
                                          variants={sectionItemVariants}
                                        >
                                          <Link
                                            href={
                                              sectionHrefs[activeMenu][si]?.[li] ?? "/"
                                            }
                                            className="group -mx-2 block rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-slate-50/80"
                                          >
                                            <p className="text-[13px] font-medium text-slate-800 group-hover:text-slate-950">
                                              {link.label}
                                            </p>
                                            <p className="mt-0.5 text-[12px] leading-[1.4] text-slate-400 group-hover:text-slate-500">
                                              {link.description}
                                            </p>
                                          </Link>
                                        </motion.div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              ),
                            )}
                          </motion.div>

                          {/* Right: Feature box */}
                          <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: 0.08, ease: "easeOut" }}
                            className="flex flex-col justify-between rounded-xl border border-slate-100/80 bg-gradient-to-b from-slate-50/50 to-slate-50/80 p-5"
                          >
                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-widest text-accent/70">
                                {nav[activeMenu].feature.eyebrow}
                              </p>
                              <h2 className="mt-2.5 text-base font-semibold leading-snug text-slate-800">
                                {nav[activeMenu].feature.title}
                              </h2>
                              <p className="mt-2 text-[12.5px] leading-[1.55] text-slate-400">
                                {nav[activeMenu].feature.description}
                              </p>
                            </div>
                            <Link
                              href={navHrefs[activeMenu]}
                              className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-[13px] font-medium text-white transition-all duration-150 hover:bg-slate-800 hover:shadow-sm"
                            >
                              {nav.openSection}
                              <svg
                                className="h-3.5 w-3.5"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                              >
                                <path d="M6 4l4 4-4 4" />
                              </svg>
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile full-screen drawer ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              role="dialog"
              aria-modal="true"
              className="fixed top-0 right-0 z-50 flex h-full w-[min(340px,100vw)] flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex h-20 flex-shrink-0 items-center justify-between px-6">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    src="/images/logo-inslab-black-transparent-v1.png"
                    alt="INSLAB logo"
                    width={32}
                    height={32}
                    className="h-7 w-auto"
                  />
                  <span className="text-[1rem] font-black tracking-wider text-slate-900">
                    INSLAB
                  </span>
                </Link>
                <motion.button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={nav.closeMenu}
                  whileTap={{ scale: 0.88 }}
                  className="p-2 text-slate-500 hover:text-slate-900"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M 4 4 L 20 20" />
                    <path d="M 4 20 L 20 4" />
                  </svg>
                </motion.button>
              </div>

              {/* Drawer nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.065, delayChildren: 0.08 } },
                  }}
                  className="space-y-1"
                >
                  {navOrder.map((key) => {
                    const item = nav[key];
                    const isActive =
                      navActivePaths[key]?.includes(normalizedPath ?? "") ?? false;
                    const hasSubLinks = navKeysWithSubLinks.includes(key);
                    const isExpanded = expandedMobileKey === key;
                    const subLinks: { label: string; href: string }[] | undefined =
                      nav.mobileSubLinks?.[key];

                    return (
                      <motion.li
                        key={key}
                        variants={{
                          hidden: { opacity: 0, x: 24 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
                        }}
                      >
                        {hasSubLinks && subLinks ? (
                          <>
                            {/* Accordion trigger */}
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedMobileKey(isExpanded ? null : key)
                              }
                              className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-base transition-colors ${
                                isActive
                                  ? "bg-slate-100 font-semibold text-slate-900"
                                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              aria-expanded={isExpanded}
                            >
                              <span>{item.label}</span>
                              <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-slate-400"
                              >
                                <ChevronDown className="h-4 w-4" />
                              </motion.span>
                            </button>

                            {/* Accordion content */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  className="overflow-hidden"
                                >
                                  {subLinks.map((sub) => (
                                    <li key={sub.href}>
                                      <Link
                                        href={sub.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block rounded-lg py-2 pl-10 pr-4 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={navHrefs[key]}
                            onClick={() => setIsMenuOpen(false)}
                            className={`group flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors ${
                              isActive
                                ? "bg-slate-100 font-semibold text-slate-900"
                                : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            {item.label}
                            <motion.span
                              className="text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                              aria-hidden="true"
                              animate={isActive ? { opacity: 1 } : {}}
                            >
                              →
                            </motion.span>
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* Mobile search */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <input
                    type="text"
                    placeholder={nav.searchPlaceholder}
                    aria-label={nav.searchPlaceholder}
                    className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </nav>

              {/* Drawer footer */}
              <div className="flex-shrink-0 border-t border-slate-100 px-6 py-5">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <Link
                    href="/join"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
                  >
                    {nav.joinUs}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
