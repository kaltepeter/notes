import { graphql, useStaticQuery } from "gatsby";

export interface Page {
  id: string;
  slug: string;
  segments: string[];
  tags: string[];
  date: Date;
  title: string;
}

export interface PageList {
  [id: string]: Page;
}

export interface Path {
  name: string;
  slug?: string;
  children: PathList;
}

export interface PathList {
  [id: string]: Path;
}

export const usePageTree = (): {
  pages: PageList;
  allTags: Set<string>;
  allPaths: PathList;
} => {
  const { allMarkdownRemark: pageList } = useStaticQuery<Queries.AllPagesQuery>(graphql`
    query AllPages {
      allMarkdownRemark(sort: { fields: { slug: ASC } }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  `);

  const allTags = new Set<string>(
    pageList.nodes
      .map((node) => node.frontmatter?.tags)
      .flat()
      .filter((t): t is string => !!t),
  );

  const pages = pageList.nodes.map((node) => ({
    id: node.id,
    title: node.frontmatter?.title ?? "",
    date: node.frontmatter?.date,
    tags: node.frontmatter?.tags?.filter((t): t is string => t !== null),
    slug: node.fields?.slug,
    segments: node.fields?.slug
      ?.split("/")
      .filter((seg): seg is string => !!seg && seg !== "")
      .slice(0, -1) ?? [],
  }));

  const allPaths: PathList = { root: { name: "root", slug: "/", children: {} } };
  pages.forEach((page) => {
    if (page.segments.length > 0) {
      const segmentList = [...page.segments];
      let curParent = allPaths["root"];
      while (segmentList.length > 0) {
        const segment = segmentList.shift()!;
        if (!curParent.children[segment]) {
          curParent.children[segment] = { name: segment, children: {} };
        }
        curParent = curParent.children[segment];
      }
      if (page.slug && page.slug.match(/README\/?$/)) {
        curParent.slug = page.slug;
      } else {
        curParent.children[page.id] = {
          name: page.title,
          slug: page.slug ?? undefined,
          children: {},
        };
      }
    } else {
      allPaths.root.children[page.id] = {
        name: page.title,
        slug: page.slug ?? undefined,
        children: {},
      };
    }
  });

  return {
    pages: Object.fromEntries(pages.map((p) => [p.id, p])) as unknown as PageList,
    allTags,
    allPaths,
  };
};
