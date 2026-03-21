import { journals } from "./journals";
import { conferences } from "./conferences";
import { domestic } from "./domestic";
import type { Publication } from "../types";

export const publications: Publication[] = [
  ...journals,
  ...conferences,
  ...domestic,
].sort((a, b) => b.year - a.year);
