export type Note = {
  excerpt: string;
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title?: string;
    date?: Date;
    tags?: string[];
  };
};
