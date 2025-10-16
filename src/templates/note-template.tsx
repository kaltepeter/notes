import React, { ReactElement } from "react";
import { HeadProps, PageProps, graphql } from "gatsby";
import { LayoutWrapper } from "../components/layout";
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
  noteStyles: {
    padding: theme.spacing(2),
    "&pre code": {
      padding: theme.spacing(4),
    },
  },
}));

export const Template = ({
  data: { markdownRemark },
}: PageProps<Queries.NoteTemplateQuery>): ReactElement<
  typeof LayoutWrapper
> => {
  // TODO: better null and error handling
  if (!markdownRemark) {
    return <div>Not found</div>;
  }

  const { frontmatter, html } = markdownRemark;
  const { modifiedDate } = pageContext;
  const { classes } = useStyles();

  const data = {
    title: frontmatter?.title || "",
    date: frontmatter?.date || "",
    html: html || "",
  };

  return (
    <LayoutWrapper>
      <Container className={classes.root}>
        <Paper className={classes.noteContent}>
          <Box className={classes.noteHeader}>
            <Typography variant="h1">{data.title}</Typography>
            <Typography variant="overline">{data.date}</Typography>
          </Box>
          {/* <MDXProvider
            components={{
              // Map HTML element tag to React component
              h1: Typography,
              // Or define component inline
              p: props => <p {...props} style={{ color: "rebeccapurple" }} />,
            }}
          > */}
          <Box dangerouslySetInnerHTML={{ __html: data.html }} />
          {/* </MDXProvider> */}
        </Paper>
      </Container>
    </LayoutWrapper>
  );
};

export const pageQuery = graphql`
  query NoteTemplate($slug: String!) {
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

export const Head = ({
  data: { markdownRemark },
  location,
}: HeadProps<Queries.NoteTemplateQuery>): ReactElement<typeof SEO> => {
  if (!markdownRemark) {
    throw new Error("No markdownRemark data");
  }

  const title = markdownRemark.frontmatter?.title || "";

  return <SEO title={title} pathname={location.pathname} />;
};

export default Template;
