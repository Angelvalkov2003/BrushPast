export type LegalSection = {
  id?: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalPageContent = {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};
