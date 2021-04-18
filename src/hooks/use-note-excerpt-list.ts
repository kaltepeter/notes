import { graphql, useStaticQuery } from "gatsby"

export const useNoteExcerptList = () => {
  const { allMarkdownRemark: noteList } = useStaticQuery(
    graphql`
      query NoteExcerptList {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date, fields___slug] }) {
          edges {
            node {
              excerpt(pruneLength: 250)
              id
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                tags
              }
            }
          }
        }
      }
    `
  )
  return {
    notes: [...noteList.edges]
  }
}
