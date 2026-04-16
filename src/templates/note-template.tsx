import React, { ReactElement } from "react";
import { HeadProps, PageProps, graphql } from "gatsby";
import { LayoutWrapper } from "../components/layout";
import { Box, Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SEO from "../components/seo";

const NoteContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const NoteContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const NoteHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

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
  // const { modifiedDate } = pageContext;

  const data = {
    title: frontmatter?.title || "",
    date: frontmatter?.date || "",
    html: html || "",
  };

  return (
    <LayoutWrapper>
      <NoteContainer>
        <NoteContent>
          <NoteHeader>
            <Typography variant="h1">{data.title}</Typography>
            <Typography variant="overline">{data.date}</Typography>
          </NoteHeader>
          <Box dangerouslySetInnerHTML={{ __html: data.html }} />
        </NoteContent>
      </NoteContainer>
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
