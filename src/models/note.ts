export type Note = {
  excerpt: string;
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title?: string;
    date?: string;
    tags?: string[];
  };
};
