import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  ClickAwayListener,
  Divider,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, navigate } from "gatsby";
import React, { useRef, useState } from "react";
import { useNoteSearch } from "../hooks/use-note-search";
import { Note } from "../models/note";

const PREVIEW_LIMIT = 5;
const MIN_QUERY_LENGTH = 3;
const SNIPPET_WINDOW = 70;

function relativeDate(isoDateStr: string | undefined): string {
  if (!isoDateStr) return "";
  const date = new Date(isoDateStr);
  if (isNaN(date.getTime())) return "";
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays < 1) return "today";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

type Snippet = { before: string; match: string; after: string; prefix: boolean; suffix: boolean };

function matchSnippet(excerpt: string, query: string): Snippet {
  const lower = excerpt.toLowerCase();
  const term = query.toLowerCase().trim().split(/\s+/)[0];
  const idx = lower.indexOf(term);
  if (idx === -1) {
    const clipped = excerpt.slice(0, SNIPPET_WINDOW * 2);
    return { before: clipped, match: "", after: "", prefix: false, suffix: excerpt.length > SNIPPET_WINDOW * 2 };
  }
  const start = Math.max(0, idx - SNIPPET_WINDOW);
  const end = Math.min(excerpt.length, idx + term.length + SNIPPET_WINDOW);
  return {
    before: excerpt.slice(start, idx),
    match: excerpt.slice(idx, idx + term.length),
    after: excerpt.slice(idx + term.length, end),
    prefix: start > 0,
    suffix: end < excerpt.length,
  };
}

export const SearchContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>(({ theme, expanded }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  transition: theme.transitions.create("width", {
    duration: theme.transitions.duration.standard,
  }),
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: expanded ? "min(55ch, 70vw)" : "auto",
  },
}));

export const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>(({ theme, expanded }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.standard,
    }),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: expanded ? "100%" : "12ch",
    },
  },
}));

const ResultsPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  minWidth: "320px",
  maxWidth: "520px",
}));

const ResultsPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  overflow: "hidden",
}));

const AllResultsLink = styled(Link)(({ theme }) => ({
  display: "block",
  padding: theme.spacing(1, 2),
  color: theme.palette.secondary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const PreviewMeta = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.25),
}));

const PreviewTags = styled("span")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
  minWidth: 0,
}));

const PreviewTag = styled("span")(({ theme }) => ({
  fontSize: "0.65rem",
  color: theme.palette.secondary.main,
  whiteSpace: "nowrap",
}));

const PreviewDate = styled("span")(({ theme }) => ({
  fontSize: "0.65rem",
  color: theme.palette.text.secondary,
  whiteSpace: "nowrap",
  flexShrink: 0,
}));

const PreviewSnippet = styled("p")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  margin: theme.spacing(0.25, 0, 0),
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

const MatchHighlight = styled("mark")(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  color: "inherit",
  fontWeight: 700,
  borderRadius: "2px",
  padding: "0 1px",
}));

type NotePreviewProps = { note: Note; query: string; onClick: () => void };

const NotePreview: React.FC<NotePreviewProps> = ({ note, query, onClick }) => {
  const snippet = note.excerpt ? matchSnippet(note.excerpt, query) : null;
  const date = relativeDate(note.frontmatter.rawDate);
  const tags = note.frontmatter.tags ?? [];

  return (
    <ListItemButton
      component={Link}
      to={note.fields.slug}
      onClick={onClick}
      alignItems="flex-start"
    >
      <ListItemText
        slotProps={{
          primary: { noWrap: true },
          secondary: { component: "div" },
        }}
        primary={note.frontmatter.title}
        secondary={
          <>
            <PreviewMeta>
              <PreviewTags>
                {tags.map((tag) => (
                  <PreviewTag key={tag}>#{tag}</PreviewTag>
                ))}
              </PreviewTags>
              {date && <PreviewDate>{date}</PreviewDate>}
            </PreviewMeta>
            {snippet && (
              <PreviewSnippet>
                {snippet.prefix && "…"}
                {snippet.before}
                {snippet.match && <MatchHighlight>{snippet.match}</MatchHighlight>}
                {snippet.after}
                {snippet.suffix && "…"}
              </PreviewSnippet>
            )}
          </>
        }
      />
    </ListItemButton>
  );
};

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const expanded = focused || trimmedQuery.length > 0;
  const searchQuery = trimmedQuery.length >= MIN_QUERY_LENGTH ? trimmedQuery : "";
  const results = useNoteSearch(searchQuery);
  const previewResults = results.slice(0, PREVIEW_LIMIT);
  const open = trimmedQuery.length >= MIN_QUERY_LENGTH;

  const handleClear = () => {
    setQuery("");
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    } else if (e.key === "Enter" && query.trim().length >= MIN_QUERY_LENGTH) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      handleClear();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClear}>
      <Box>
        <SearchContainer ref={anchorRef} expanded={expanded}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            expanded={expanded}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
          />
        </SearchContainer>
        <ResultsPopper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
        >
          <ResultsPaper elevation={4}>
            {previewResults.length > 0 ? (
              <>
                <List dense disablePadding>
                  {previewResults.map((note) => (
                    <NotePreview
                      key={note.id}
                      note={note}
                      query={query}
                      onClick={handleClear}
                    />
                  ))}
                </List>
                <Divider />
                <AllResultsLink
                  to={`/search?q=${encodeURIComponent(query)}`}
                  onClick={handleClear}
                >
                  <Typography variant="body2">
                    See all {results.length} result
                    {results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                  </Typography>
                </AllResultsLink>
              </>
            ) : (
              <Typography variant="body2" sx={{ padding: 2 }}>
                No results for &ldquo;{query}&rdquo;
              </Typography>
            )}
          </ResultsPaper>
        </ResultsPopper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchInput;
