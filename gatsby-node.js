exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const noteTemplate = require.resolve(`./src/templates/note-template.tsx`)
  
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: noteTemplate,
        context: {
          // additional data can be passed via context
          title: node.frontmatter.title,
        },
      })
    })
  }