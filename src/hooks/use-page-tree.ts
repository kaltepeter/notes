import { graphql, useStaticQuery } from "gatsby"

export interface Page {
  id: string
  slug: string
  segments: string[]
  tags: string[]
  date: Date
  title: string
}

export interface PageList {
  [id: string]: Page
}

export interface Path {
  name: string
  slug?: string
  children: PathList
}

export interface PathList {
  [id: string]: Path
}

export const usePageTree = (): {
  pages: PageList
  allTags: Set<string>
  allPaths?: PathList
} => {
  const { allMarkdownRemark: pageList } = useStaticQuery(
    graphql`
      query AllPages {
        allMarkdownRemark(sort: { fields: fields___slug, order: ASC }) {
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
    `
  )

  const allTags = new Set<string>(
    pageList.nodes
      .map(({ frontmatter }) => frontmatter.tags)
      .flat()
      .filter(t => !!t)
  )

  const pages = pageList.nodes.map(({ id, fields, frontmatter }) => ({
    id,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags,
    slug: fields.slug,
    segments: fields.slug
      ?.split("/")
      .filter(seg => seg && seg !== "")
      .slice(0, -1),
  }))

  let allPaths = { ["root"]: { name: "root", slug: '/', children: {} } }
  pages.forEach(page => {
    if (page.segments.length > 0) {
      const segmentList = [...page.segments]
      let segment
      let curParent = allPaths["root"]
      while (segmentList.length > 0) {
        segment = segmentList.shift()
        if (!curParent.children[segment]) {
          curParent.children[segment] = { name: segment, children: {} }
        }
        curParent = curParent.children[segment]
      }
      if (page.slug.match(/README\/?$/)) {
        curParent.slug = page.slug;
      } else {
        curParent.children[page.id] = {
          name: page.title,
          slug: page.slug,
          children: {},
        }
      }
    } else {
      allPaths.root.children[page.id] = {
        name: page.title,
        slug: page.slug,
        children: {},
      }
    }
  })

  return {
    pages: { ...pages },
    allTags,
    allPaths,
  }
}
