export type PublicationType = "Journal" | "Conference" | "Workshop";

export type Publication = {
  id: string;
  year: number;
  type: PublicationType;
  title: string;
  authors: string[];
  venue: string;
  details: string;
  tags: string[];
  pdfUrl: string;
  doiUrl: string;
};
