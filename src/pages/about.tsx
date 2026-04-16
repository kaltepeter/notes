import { Box, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { HeadProps } from "gatsby";
import React, { ReactElement } from "react";
import Image from "../components/image";
import Layout from "../components/layout";
import SEO from "../components/seo";

const ContentColumn = styled("article")(({ theme }) => ({
  maxWidth: "720px",
  margin: "0 auto",
  padding: theme.spacing(4, 2),
}));

const FeatureImage = styled(Box)(({ theme }) => ({
  height: "40vh",
  overflow: "hidden",
  position: "relative",
  marginBottom: theme.spacing(4),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <ContentColumn>
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
        <Section>
          <Typography component="p" variant="body1">
            We should <em>write it down</em>, <em>anyway</em> that works for
            you.
          </Typography>
        </Section>
        <Section>
          <List>
            <ListItem>
              <a href="https://sourcesofinsight.com/write-things-down/">
                10 Reasons for Writing Things Down
              </a>
            </ListItem>
            <ListItem>
              <a href="https://nesslabs.com/note-taking">
                The science of note-taking
              </a>
            </ListItem>
          </List>
        </Section>
      </ContentColumn>
    </Layout>
  );
};

export default AboutPage;
export const Head = ({ location }: HeadProps): ReactElement<typeof SEO> => (
  <SEO title="About" pathname={location.pathname} />
);
