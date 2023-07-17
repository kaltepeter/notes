// @ts-check

const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
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

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`{
  allMarkdownRemark(sort: [{frontmatter: {date: DESC}}, {fields: {slug: ASC}}]) {
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
}`);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    throw result.errors;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: require.resolve(`./src/templates/note-template.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
