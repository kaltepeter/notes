import { Box, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { HeadProps, PageProps } from "gatsby";
import React, { ReactElement } from "react";
import Layout from "../components/layout";
import NoteListEntry from "../components/note-list-entry";
import SEO from "../components/seo";
import { useNoteSearch } from "../hooks/use-note-search";

const ResultsHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const MIN_QUERY_LENGTH = 3;

const SearchPage: React.FC<PageProps> = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const query = (params.get("q") ?? "").trim();
  const searchQuery = query.length >= MIN_QUERY_LENGTH ? query : "";
  const results = useNoteSearch(searchQuery);

  return (
    <Layout>
      <ResultsHeader>
        <Typography variant="h5" component="h1">
          {searchQuery
            ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
            : "Enter a search term"}
        </Typography>
      </ResultsHeader>
      {query && !searchQuery && (
        <Typography variant="body1" color="text.secondary">
          Enter at least {MIN_QUERY_LENGTH} characters to search.
        </Typography>
      )}
      {searchQuery && results.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No results found for &ldquo;{query}&rdquo;.
        </Typography>
      )}
      {results.length > 0 && (
        <List>
          {results.map((note) => (
            <NoteListEntry key={note.id} note={note} titleComponent="h2" />
          ))}
        </List>
      )}
    </Layout>
  );
};

export default SearchPage;
export const Head = ({ location }: HeadProps): ReactElement<typeof SEO> => (
  <SEO title="Search" pathname={location.pathname} />
);
