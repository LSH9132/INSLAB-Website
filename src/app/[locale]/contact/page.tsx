import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { ContactContent } from "@/features/contact/components/contact-content";
import { ContactHero } from "@/features/contact/components/contact-hero";
import { routing } from "@/i18n/routing";
import type { Messages } from "@/types/messages";

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

  const messages = (await getMessages()) as Messages;

  return (
    <PageShell
      currentPath="/contact"
      locale={locale}
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="flex-1 bg-stone-50"
    >
      <ContactHero hero={messages.contact.hero} />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-12 lg:px-10 lg:pb-20">
        <ContactContent dict={messages.contact} />
      </div>
    </PageShell>
  );
}
