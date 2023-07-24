import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { resolve } from "path";

// export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
//   ({ actions }) => {
//     const { createTypes } = actions;
//     const typeDefs = `
//     type Site {
//       siteMetadata: SiteMetadata!
//     }

//     type SiteMetadata {
//       title: String!
//       siteUrl: String!
//       description: String!
//     }
//   `;
//     createTypes(typeDefs);
//   };

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `markdown-pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { data, errors } = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      allMarkdownRemark(
        sort: [{ frontmatter: { date: DESC } }, { fields: { slug: ASC } }]
      ) {
        edges {
          node {
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

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    throw errors;
  }

  if (!data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    throw new Error("No data returned from GraphQL query");
  }

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node?.fields?.slug || node.fields.slug === "") {
      console.warn(`No slug for node: ${JSON.stringify(node, null, 2)}`);
      return;
    }

    createPage({
      path: `${node.fields.slug}`,
      component: resolve(`./src/templates/note-template.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
