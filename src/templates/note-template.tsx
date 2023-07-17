import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Box, Container, Paper, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import SEO from "../components/seo";

const useStyles = makeStyles({ name: "Template" })((_theme) => ({
  root: {
    padding: _theme.spacing(4),
  },
  noteHeader: {
    display: "flex",
    flexDirection: "column",
  },
  noteContent: {
    padding: _theme.spacing(4),
  },
}));

export default function Template<PageProps>({
  data, // this prop will be injected by the GraphQL query below.
  pageContext,
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const { modifiedDate } = pageContext;
  const { classes } = useStyles();

  return (
    <Layout>
      <Container className={classes.root}>
        <Paper className={classes.noteContent}>
          <Box className={classes.noteHeader}>
            <Typography variant="h1">{frontmatter.title}</Typography>
            <Typography variant="overline">{frontmatter.date}</Typography>
          </Box>
          <Box dangerouslySetInnerHTML={{ __html: html }} />
        </Paper>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;

export const Head = ({ data, location }) => {
  return (
    <SEO
      title={data.markdownRemark.frontmatter?.title}
      pathname={location.pathname}
    />
  );
};
