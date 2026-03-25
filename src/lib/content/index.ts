import { loadContent } from "./loader";
import {
  MembersSchema,
  NewsItemsSchema,
  PublicationsSchema,
  ResearchAreasSchema,
  DirectorDataSchema,
} from "./schemas";
import type { MemberRole } from "./schemas";
export type {
  Member,
  MemberRole,
  NewsItem,
  NewsCategory,
  Publication,
  PublicationType,
  ResearchArea,
  Education,
  Career,
  Project,
  Patent,
} from "./schemas";

export { roleOrder, categoryOrder } from "./constants";

// ── Team ─────────────────────────────────────────────────────────────

export function getMembers() {
  return loadContent("team/members.yaml", MembersSchema);
}

export function getMembersByRole(role: MemberRole) {
  return getMembers().filter((m) => m.role === role);
}

// ── News ─────────────────────────────────────────────────────────────

export function getNewsItems() {
  return loadContent("news/news-items.yaml", NewsItemsSchema);
}

// ── Publications ─────────────────────────────────────────────────────

export function getPublications() {
  const journals = loadContent(
    "publications/journals.yaml",
    PublicationsSchema,
  );
  const conferences = loadContent(
    "publications/conferences.yaml",
    PublicationsSchema,
  );
  const domestic = loadContent(
    "publications/domestic.yaml",
    PublicationsSchema,
  );
  return [...journals, ...conferences, ...domestic].sort((a, b) => {
    const dateA = a.date ?? `${a.year}-12-31`;
    const dateB = b.date ?? `${b.year}-12-31`;
    return dateB.localeCompare(dateA);
  });
}

export function getDirectorPublications() {
  return loadContent("director/publications.yaml", PublicationsSchema);
}

// ── Research ─────────────────────────────────────────────────────────

export function getResearchAreas() {
  return loadContent("research/areas.yaml", ResearchAreasSchema);
}

// ── Director ─────────────────────────────────────────────────────────

function getDirectorData() {
  return loadContent("director/director.yaml", DirectorDataSchema);
}

export function getDirectorEducation() {
  return getDirectorData().education;
}

export function getDirectorCareer() {
  return getDirectorData().career;
}

export function getDirectorProjects() {
  return getDirectorData().projects;
}

export function getDirectorPatents() {
  return getDirectorData().patents;
}
