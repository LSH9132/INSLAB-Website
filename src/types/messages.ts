/** Shared type definitions derived from en.json / ko.json message structure */

/**
 * Permissive namespace type for message sections not yet fully typed.
 * This centralizes the `any` usage so individual components stay clean.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MessageNamespace = Record<string, any>;

export interface NavLink {
  label: string;
  description: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface NavFeature {
  eyebrow: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  summary: string;
  sections: NavSection[];
  feature: NavFeature;
}

export interface MobileSubLink {
  label: string;
  href: string;
}

export interface NavData {
  home: NavItem;
  research: NavItem;
  publications: NavItem;
  team: NavItem;
  contact: NavItem;
  searchPlaceholder: string;
  joinUs: string;
  openSection: string;
  openMenu: string;
  closeMenu: string;
  mobileSubLinks: Record<string, MobileSubLink[]>;
  announcements?: { text: string; href?: string }[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterData {
  tagline: string;
  columns: Record<string, FooterColumn>;
  contact: {
    title: string;
    address: string;
    email: string;
  };
  cta: {
    title: string;
    primary: string;
    secondary: string;
  };
  copyright: string;
  privacy: string;
  terms: string;
}

export interface ContactDict {
  hero: { eyebrow: string; title: string; body: string };
  info: {
    title: string;
    address: { label: string; line1: string; line2: string };
    email: { label: string; value: string };
    phone: { label: string; value: string };
  };
  inquiries: {
    title: string;
    types: { icon: string; title: string; description: string }[];
  };
  directions: {
    title: string;
    placeholder: string;
    address: string;
    openInMap: string;
  };
}

export interface JoinDict {
  hero: { eyebrow: string; title: string; body: string; bodySecond: string };
  why: {
    title: string;
    points: { title: string; description: string }[];
  };
  recruitment: {
    title: string;
    fields: { name: string; description: string }[];
    idealCandidate: { title: string; points: string[] };
    qualifications: { title: string; points: string[] };
    benefits: { title: string; points: string[] };
    process: { title: string; steps: string[] };
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  apply: {
    title: string;
    description: string;
    emailLabel: string;
    documentsLabel: string;
    documents: string[];
  };
}

export interface TeamDict {
  hero: { eyebrow: string; title: string; body: string; bodySecond: string };
  sections: { director: string; graduate: string; undergraduate: string };
  roles: { professor: string; phd: string; ms: string; bs: string };
  stats: { value: string; label: string }[];
  viewProfile: string;
}

export interface Messages {
  nav: NavData;
  footer: FooterData;
  home: MessageNamespace;
  publications: MessageNamespace;
  Director: MessageNamespace;
  team: TeamDict;
  research: MessageNamespace;
  contact: ContactDict;
  news: MessageNamespace;
  join: JoinDict;
}
