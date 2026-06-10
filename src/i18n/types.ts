export interface TranslationDictionary {
  [key: string]: string;
}

export interface LocalizedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageGlowColor: string;
  accentColor: string;
  features: string[];
}

export interface LocalizedMilestone {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  bullets: string[];
  tags: string[];
}
