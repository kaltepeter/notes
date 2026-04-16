import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Box as Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { HeadProps, PageProps } from "gatsby";
import React, { ReactElement } from "react";
import Image from "../components/image";
import Layout from "../components/layout";
import { NoteList } from "../components/note-list";
import SEO from "../components/seo";

const PageGrid = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(0, 4),
  justifyContent: "space-between",
  alignItems: "stretch",
}));

const FeatureImage = styled(Paper)({
  maxHeight: "40vh",
  overflow: "hidden",
});

const FeatureSection = styled(Paper)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  "& h3": {
    textAlign: "right",
    paddingRight: theme.spacing(2),
  },
}));

const VerticalDividerWrapper = styled(Box)({
  display: "none",
  "@media (min-width: 1536px)": {
    display: "block",
  },
});

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
  };
  pageContext: {
    slug: string;
  };
}

const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <Layout>
      <PageGrid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FeatureImage>
            <Image />
          </FeatureImage>
          <FeatureSection>
            <Typography variant="h3">Write It Down</Typography>
            <List>
              <ListItem>How do we remember things?</ListItem>
              <ListItem>How do we solidify our understandings?</ListItem>
              <ListItem>How do we free up our minds?</ListItem>
              <ListItem>How do we organize thoughts?</ListItem>
            </List>
          </FeatureSection>
          <FeatureSection>
            <Typography component="p" variant="body2">
              We should <em>write it down</em>, <em>anyway</em> that works for
              you.
            </Typography>
          </FeatureSection>
          <FeatureSection>
            <List>
              <ListItem>
                <a href="https://sourcesofinsight.com/write-things-down/">
                  10 Reasons for Writing Things Down
                </a>
              </ListItem>
              <ListItem>
                <a href="https://nesslabs.com/note-taking">
                  The science of note-taking"
                </a>
              </ListItem>
            </List>
          </FeatureSection>
        </Grid>
        <VerticalDividerWrapper>
          <Divider orientation="vertical" flexItem component="span" />
        </VerticalDividerWrapper>
        <Grid size={{ xs: 12, sm: 5 }}>
          <NoteList />
        </Grid>
      </PageGrid>
    </Layout>
  );
};

export default IndexPage;
export const Head = ({ location }: HeadProps): ReactElement<typeof SEO> => (
  <SEO title="Home" pathname={location.pathname} />
);
