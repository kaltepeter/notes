import { graphql, useStaticQuery } from "gatsby";

export const useNoteExcerptList = () => {
  const { allMarkdownRemark: noteList } = useStaticQuery(graphql`
    query NoteExcerptList {
      allMarkdownRemark(
        sort: [{ frontmatter: { date: DESC } }, { fields: { slug: ASC } }]
      ) {
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
  `);
  return {
    notes: [...noteList.edges],
  };
};
