import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface-soft">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
        <div className="space-y-4">
          <Image
            src="/images/logo-inslab-black-transparent-v1.png"
            alt="INSLAB logo"
            width={132}
            height={40}
            className="h-8 w-auto"
          />
          <p className="max-w-sm text-sm leading-7 text-slate-500">
            Artificial Intelligence Network Systems Laboratory. We explore
            trustworthy machine intelligence, network optimization, and secure
            distributed systems.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-900 uppercase">
            Quick Links
          </h2>
          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <Link href="/publications" className="hover:text-slate-900">
              Publications
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-900 uppercase">
            Contact
          </h2>
          <address className="space-y-2 text-sm leading-7 text-slate-500 not-italic">
            <p>Engineering Building A</p>
            <p>Seoul, Republic of Korea</p>
            <p>inslab@university.edu</p>
          </address>
        </div>
      </div>
    </footer>
  );
}
