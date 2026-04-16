import React, { ReactElement } from "react";
import { HeadProps, Link, PageProps, graphql } from "gatsby";
import { LayoutWrapper } from "../components/layout";
import { Box, Breadcrumbs, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SEO from "../components/seo";

const ReadingColumn = styled("article")(({ theme }) => ({
  maxWidth: "720px",
  margin: "0 auto",
  padding: theme.spacing(4, 2),
}));

const NoteHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const TagList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
  listStyle: "none",
  padding: 0,
  margin: theme.spacing(1, 0, 0),
}));

const NoteTag = styled((props: React.ComponentProps<typeof Chip>) => (
  <Chip component="span" {...props} />
))({
  border: "none",
  borderRadius: 0,
});

export const Template = ({
  data: { markdownRemark },
}: PageProps<Queries.NoteTemplateQuery>): ReactElement<typeof LayoutWrapper> => {
  if (!markdownRemark) {
    return <div>Not found</div>;
  }

  const { frontmatter, html } = markdownRemark;

  const data = {
    title: frontmatter?.title || "",
    date: frontmatter?.date || "",
    tags: frontmatter?.tags || [],
    html: html || "",
  };

  return (
    <LayoutWrapper>
      <ReadingColumn>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
          <Link to="/">Notes</Link>
        </Breadcrumbs>
        <NoteHeader>
          <Typography variant="h1">{data.title}</Typography>
          <Typography variant="overline">{data.date}</Typography>
          {data.tags && data.tags.length > 0 && (
            <TagList>
              {data.tags.map((tag) => (
                <Typography component="li" variant="subtitle2" key={tag}>
                  <NoteTag
                    size="small"
                    variant="outlined"
                    color="secondary"
                    label={`#${tag}`}
                  />
                </Typography>
              ))}
            </TagList>
          )}
        </NoteHeader>
        <Box dangerouslySetInnerHTML={{ __html: data.html }} />
      </ReadingColumn>
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
