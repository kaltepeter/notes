import React from "react"
import { Link, PageProps } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Box, Button, Typography } from "@material-ui/core"

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = () => (
  <Layout>
    <Box>
    <SEO title="Home" />
    <ul>
      <li>How do we remember things?</li>
      <li>How do we solidify our understandings?</li>
      <li>How do we free up our minds?</li>
      <li>How do we organize thoughts?</li>
    </ul>
    <p>We should <em>write it down</em>, <em>anyway</em> that works for you.</p>
    <Image />
    <a href="https://sourcesofinsight.com/write-things-down/">10 Reasons for Writing Things Down</a> 
    <br />
    <a href="https://nesslabs.com/note-taking">The science of note-taking"</a>
    </Box>
  </Layout>
)

export default IndexPage
