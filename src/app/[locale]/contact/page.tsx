import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { ContactContent } from "@/features/contact/components/contact-content";
import { ContactHero } from "@/features/contact/components/contact-hero";
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
      mainClassName="flex-1 bg-stone-50"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20">
        <ContactHero hero={messages.contact.hero} />

        <ContactContent dict={messages.contact} />
      </div>
    </PageShell>
  );
}
