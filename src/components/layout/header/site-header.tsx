"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { SiteUtilityBar } from "./site-utility-bar";

type SiteHeaderProps = {
  currentPath?: string;
};

type MegaMenuSection = {
  title: string;
  links: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

type NavigationItem = {
  id: string;
  href: string;
  label: string;
  activePaths?: string[];
  summary: string;
  sections: MegaMenuSection[];
  feature: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
  };
};

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    href: "/",
    label: "Home",
    activePaths: ["/"],
    summary: "Overview of the lab, mission, and latest achievements.",
    sections: [
      {
        title: "Overview",
        links: [
          {
            href: "/",
            label: "Hero Overview",
            description: "Landing section introducing INSLAB's research identity.",
          },
          {
            href: "/#mission",
            label: "Mission",
            description: "Lab mission, impact, and core performance metrics.",
          },
        ],
      },
      {
        title: "Highlights",
        links: [
          {
            href: "/#research-areas",
            label: "Research Areas",
            description: "Key investigation pillars shaping the lab's direction.",
          },
          {
            href: "/#site-footer",
            label: "Contact",
            description: "Find collaboration and contact points for the lab.",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Start Here",
      title: "See how INSLAB frames research for visitors at a glance.",
      description:
        "Use the home page to anchor the lab's story before users dive into detailed publications and projects.",
      href: "/",
    },
  },
  {
    id: "research",
    href: "/#research-areas",
    label: "Research",
    summary: "Research themes, lab directions, and domain highlights.",
    sections: [
      {
        title: "Core Areas",
        links: [
          {
            href: "/#research-areas",
            label: "Intelligent Networking",
            description: "Adaptive, autonomous networking systems and protocols.",
          },
          {
            href: "/#research-areas",
            label: "Distributed AI",
            description: "Decentralized intelligence for edge and federated systems.",
          },
        ],
      },
      {
        title: "Systems Focus",
        links: [
          {
            href: "/#research-areas",
            label: "Cyber-Physical Systems",
            description: "Robust infrastructures and secure real-time environments.",
          },
          {
            href: "/publications",
            label: "Research Output",
            description: "Browse papers that reflect the lab's current priorities.",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Research Focus",
      title: "Connect high-level themes to specific publication output.",
      description:
        "The research mega menu should help visitors jump from strategic topics to tangible results with minimal friction.",
      href: "/publications",
    },
  },
  {
    id: "publications",
    href: "/publications",
    label: "Publications",
    activePaths: ["/publications"],
    summary: "Selected papers, venues, filters, and academic output.",
    sections: [
      {
        title: "Browse",
        links: [
          {
            href: "/publications",
            label: "Selected Publications",
            description: "Curated list of representative journals and conferences.",
          },
          {
            href: "/publications",
            label: "Publication Filters",
            description: "Explore output by year, area, and publication type.",
          },
        ],
      },
      {
        title: "Use Cases",
        links: [
          {
            href: "/publications",
            label: "Venue Highlights",
            description: "See where INSLAB is publishing across focus domains.",
          },
          {
            href: "/publications",
            label: "Topic Tags",
            description: "Scan themes like AI Networks, Security, and Edge AI.",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Academic Output",
      title: "Present research with filtering, hierarchy, and strong typography.",
      description:
        "This section turns Stitch output into a maintainable publications experience aligned with the site's design system.",
      href: "/publications",
    },
  },
  {
    id: "team",
    href: "/#mission",
    label: "Team",
    summary: "People, culture, collaboration, and opportunities to join.",
    sections: [
      {
        title: "People",
        links: [
          {
            href: "/#mission",
            label: "Lab Snapshot",
            description: "Quick entry point to the team scale and lab context.",
          },
          {
            href: "/#site-footer",
            label: "Contact the Lab",
            description: "Reach out for projects, collaboration, or graduate study.",
          },
        ],
      },
      {
        title: "Opportunities",
        links: [
          {
            href: "/#site-footer",
            label: "Join Us",
            description: "Learn how to connect with INSLAB for future openings.",
          },
          {
            href: "/publications",
            label: "Work With Us",
            description: "Review the type of work the lab is currently producing.",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "People & Culture",
      title: "Position the team as a living research environment, not just a member list.",
      description:
        "Use this space to bridge lab identity, collaboration, and recruitment before the full members page arrives.",
      href: "/#mission",
    },
  },
  {
    id: "contact",
    href: "/#site-footer",
    label: "Contact",
    summary: "Ways to reach the lab for collaboration or admissions.",
    sections: [
      {
        title: "Reach Out",
        links: [
          {
            href: "/#site-footer",
            label: "Lab Contact",
            description: "Primary email and location for the laboratory.",
          },
          {
            href: "/#site-footer",
            label: "Collaboration",
            description: "Use contact points for industry and academic partnerships.",
          },
        ],
      },
      {
        title: "Explore",
        links: [
          {
            href: "/publications",
            label: "Recent Publications",
            description: "Review recent output before initiating contact.",
          },
          {
            href: "/",
            label: "Lab Overview",
            description: "Return to the landing page for the broader lab narrative.",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Connect",
      title: "Guide visitors toward the right next step with context.",
      description:
        "Whether users want to collaborate, join the lab, or cite the work, the contact menu should give them a clear direction.",
      href: "/#site-footer",
    },
  },
];

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [shouldShowUtilityBar, setShouldShowUtilityBar] = useState(true);
  const lastScrollYRef = useRef(0);

  const activeMenu =
    navigationItems.find((item) => item.id === activeMenuId) ?? null;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 16) {
        setShouldShowUtilityBar(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      setShouldShowUtilityBar(currentScrollY < lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full" onMouseLeave={() => setActiveMenuId(null)}>
      <motion.div
        initial={false}
        animate={
          shouldShowUtilityBar
            ? { height: 28, opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <SiteUtilityBar />
      </motion.div>

      <div className="border-b border-slate-100 bg-white/92 backdrop-blur-sm">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-inslab-black-transparent-v1.png"
              alt="INSLAB logo"
              width={132}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-10 lg:flex">
            <nav className="flex items-center gap-8">
              {navigationItems.map((item) => {
                const isActive =
                  item.activePaths?.includes(currentPath ?? "") ?? false;
                const isOpen = activeMenuId === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setActiveMenuId(item.id)}
                    onFocus={() => setActiveMenuId(item.id)}
                    className={`text-sm transition-colors ${
                      isActive
                        ? "border-b-2 border-slate-900 pb-0.5 font-semibold text-slate-900"
                        : isOpen
                          ? "font-semibold text-slate-900"
                          : "font-medium text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="relative">
              <div className="flex w-64 items-center rounded-sm border border-gray-200 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900">
                <svg
                  className="h-[18px] w-[18px] text-gray-400"
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
                  placeholder="Search publications..."
                  className="w-full border-none bg-transparent px-2 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              className="flex h-9 min-w-[80px] items-center justify-center overflow-hidden rounded-sm bg-slate-900 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              <span className="truncate">Login</span>
            </button>
          </div>

          <button
            type="button"
            className="p-2 text-slate-900 lg:hidden"
            aria-label="Open navigation menu"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>

          <AnimatePresence>
            {activeMenu ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full right-0 left-0 hidden pt-4 lg:block"
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                  <div className="grid grid-cols-[1.4fr_0.9fr] gap-10 px-6 py-8 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      {activeMenu.sections.map((section) => (
                        <div key={section.title}>
                          <h2 className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                            {section.title}
                          </h2>
                          <div className="space-y-4">
                            {section.links.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className="block rounded-xl px-3 py-2 transition-colors hover:bg-slate-50"
                              >
                                <p className="text-sm font-semibold text-slate-900 hover:text-accent">
                                  {link.label}
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                  {link.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                      <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
                        {activeMenu.feature.eyebrow}
                      </p>
                      <h2 className="mt-3 text-2xl leading-tight font-semibold text-slate-900">
                        {activeMenu.feature.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-slate-500">
                        {activeMenu.feature.description}
                      </p>
                      <p className="mt-6 text-sm font-medium text-slate-400">
                        {activeMenu.summary}
                      </p>
                      <Link
                        href={activeMenu.feature.href}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-accent"
                      >
                        Open Section
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
