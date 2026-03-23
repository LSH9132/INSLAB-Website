import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type { FooterData } from "@/types/messages";
import { socialLinks } from "@/lib/social-links";

type SiteFooterProps = {
  footer: FooterData;
};

export function SiteFooter({ footer }: SiteFooterProps) {
  const [tagLine1, tagLine2] = footer.tagline.split("\n");
  const columns = Object.values(
    footer.columns as Record<string, { title: string; links: { label: string; href: string }[] }>
  );

  return (
    <footer id="site-footer" className="border-t border-slate-200 bg-white pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top: Logo (left) | Link columns + CTA (right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Logo + tagline + social */}
          <div className="lg:col-span-4">
            <div className="mb-5">
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
            <p className="mb-5 text-sm leading-relaxed text-slate-500">
              {tagLine1}
              <br />
              {tagLine2}
            </p>
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

          {/* Link columns + CTA */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.title}>
                  <h2 className="mb-4 text-xs font-semibold tracking-wider text-slate-900 uppercase">
                    {col.title}
                  </h2>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-500 transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA — below link columns, right-aligned */}
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
              <p className="text-sm font-semibold text-slate-900">
                {footer.cta.title}
              </p>
              <div className="flex gap-2.5">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/35"
                >
                  {footer.cta.primary}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                >
                  {footer.cta.secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright only */}
        <div className="mt-10 border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
