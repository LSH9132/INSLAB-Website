import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { ContactContent } from "@/features/contact/components/contact-content";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = (await getMessages()) as any;

  return (
    <PageShell
      currentPath="/contact"
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20"
    >
      {/* Hero inline — simpler page */}
      <section className="mb-14 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase">
          <span className="h-px w-8 bg-slate-300" />
          {messages.contact.hero.eyebrow}
        </div>
        <h1 className="max-w-4xl text-5xl leading-none font-medium tracking-tight text-slate-900 font-serif italic md:text-7xl">
          {messages.contact.hero.title}
        </h1>
        <p className="max-w-2xl text-lg leading-8 font-light text-slate-500 md:text-xl">
          {messages.contact.hero.body}
        </p>
      </section>

      <ContactContent dict={messages.contact} />
    </PageShell>
  );
}
