export const site = {
  name: "Jon",
  domain: "jon.dev",
  year: 2026,
  description:
    "A personal index of writing, projects, and work in progress.",
};

export type WritingEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  topic: string;
  body: string[];
};

export const writing: WritingEntry[] = [
  {
    slug: "why-this-site-exists",
    title: "Why this site exists",
    description:
      "A small, Git-driven home for notes, projects, and work in progress.",
    date: "2026-07-19",
    displayDate: "July 2026",
    topic: "Meta",
    body: [
      "This is a small home for things I want to keep on the public web.",
      "Writing lives beside projects, and both are managed in Git. There is no feed to optimize, no CMS to tend, and no elaborate publishing system—just files, commits, and a site that can stay small.",
      "The shape of it will change as more things are worth keeping.",
    ],
  },
];

export type ProjectEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  status: string;
};

export const projects: ProjectEntry[] = [
  {
    slug: "jon-dev",
    title: "jon.dev",
    description:
      "This site. A static, Git-driven index for writing and projects.",
    category: "Web",
    year: "2026",
    status: "In progress",
  },
];
