import Image from "../components/image"
import Layout from "../components/layout"
import React from "react"
import SEO from "../components/seo"
import { Box as Paper, Divider, Grid, Hidden, List, ListItem,  Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import { graphql, PageProps } from "gatsby"
import { NoteList } from "../components/note-list"

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 4),
  },
  featureText: {
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
      textAlign: "right",
      paddingRight: theme.spacing(2),
    },
  },
  featureImage: {
    maxHeight: "40vh",
    overflow: "hidden",
  },
}));

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
  pageContext: {
    slug: string;
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data, pageContext }) => {
  const { classes } = useStyles()

  return (
    <Layout>
      <SEO title="Home" />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={4}
        className={classes.root}
      >
        <Grid item xs={12} sm={6}>
          <Paper className={classes.featureImage}>
            <Image />
          </Paper>
          <Paper className={classes.featureText}>
            <Typography variant="h3">Write It Down</Typography>
            <List>
              <ListItem>How do we remember things?</ListItem>
              <ListItem>How do we solidify our understandings?</ListItem>
              <ListItem>How do we free up our minds?</ListItem>
              <ListItem>How do we organize thoughts?</ListItem>
            </List>
          </Paper>
          <Paper className={classes.featureText}>
            <Typography component="p" variant="body2">
              We should <em>write it down</em>, <em>anyway</em> that works for
              you.
            </Typography>
          </Paper>
          <Paper className={classes.featureText}>
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
          </Paper>
        </Grid>
        <Hidden mdDown>
          <Divider
            orientation="vertical"
            flexItem
            component="span"
          />
        </Hidden>
        <Grid item xs={12} sm={5}>
          <NoteList />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default IndexPage
