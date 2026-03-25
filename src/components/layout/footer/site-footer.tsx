import Image from "next/image";

import { Link } from "@/i18n/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SiteFooterProps = {
  footer: any;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export function SiteFooter({ footer }: SiteFooterProps) {
  const [addressLine1, addressLine2] = footer.sections.contact.address.split("\n");
  const [tagLine1, tagLine2] = footer.tagline.split("\n");

  return (
    <footer id="site-footer" className="border-t border-slate-200 bg-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-6">
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
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              {tagLine1}
              <br />
              {tagLine2}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-slate-400 hover:text-slate-900"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-slate-900"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-xs font-semibold tracking-wider text-slate-900 uppercase">
              {footer.sections.research.title}
            </h2>
            <ul className="space-y-4">
              {footer.sections.research.links.map(
                (link: { label: string; href: string }) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-xs font-semibold tracking-wider text-slate-900 uppercase">
              {footer.sections.lab.title}
            </h2>
            <ul className="space-y-4">
              {footer.sections.lab.links.map(
                (link: { label: string; href: string }) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-xs font-semibold tracking-wider text-slate-900 uppercase">
              {footer.sections.contact.title}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-sm text-slate-400">◎</span>
                <span className="text-sm text-slate-500">
                  {addressLine1}
                  <br />
                  {addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-sm text-slate-400">✉</span>
                <a
                  href="mailto:dyoung.kim@sch.ac.kr"
                  className="text-sm text-slate-500 hover:text-accent"
                >
                  dyoung.kim@sch.ac.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 md:flex-row">
          <p className="text-xs text-slate-400">
            {footer.copyright}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-900">
              {footer.privacy}
            </a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-900">
              {footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
