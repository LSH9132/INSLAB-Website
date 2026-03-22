import Image from "next/image";

import { Link } from "@/i18n/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SiteFooterProps = {
  footer: any;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function GithubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
    </svg>
  );
}

function ResearchGateIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.586 0c-1.37 0-2.606.503-3.478 1.467C15.236 2.43 14.8 3.804 14.8 5.4c0 1.596.436 2.97 1.308 3.933.872.964 2.108 1.467 3.478 1.467s2.606-.503 3.478-1.467C23.936 8.37 24 6.996 24 5.4c0-1.596-.064-2.97-.936-3.933C22.192.503 20.956 0 19.586 0zM4.8 9.6H0V24h4.8V9.6zm7.2-4.8H7.2V24h4.8V4.8z" />
    </svg>
  );
}

const socialLinks = [
  {
    id: "github",
    href: "https://github.com/inslab",
    label: "GitHub",
    Icon: GithubIcon,
  },
  {
    id: "scholar",
    href: "https://scholar.google.com",
    label: "Google Scholar",
    Icon: ScholarIcon,
  },
  {
    id: "researchgate",
    href: "https://www.researchgate.net",
    label: "ResearchGate",
    Icon: ResearchGateIcon,
  },
];

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer id="site-footer" className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Logo (left) + Social icons (right) */}
        <div className="flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-3">
            <Image
              src="/images/logo-inslab-black-transparent-v1.png"
              alt="INSLAB logo"
              width={40}
              height={40}
              className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
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

          <div className="flex gap-3">
            {socialLinks.map(({ id, href, label, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-slate-900"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-xs text-slate-400">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
