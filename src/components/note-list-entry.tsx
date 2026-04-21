import { Chip, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "gatsby";
import React from "react";
import { Note } from "../models/note";

export const NoteItemContainer = styled(ListItem)({
  "& .head": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});

const TagList = styled("ul")(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
  flexWrap: "wrap",
  listStyle: "none",
  padding: theme.spacing(0.5),
  margin: 0,
}));

const TagChip = styled((props: React.ComponentProps<typeof Chip>) => (
  <Chip component="span" {...props} />
))({
  border: "none",
  borderRadius: 0,
});

type NoteListEntryProps = {
  note: Note;
  titleComponent?: "h2" | "h3";
};

const NoteListEntry: React.FC<NoteListEntryProps> = ({
  note,
  titleComponent = "h3",
}) => (
  <NoteItemContainer divider>
    <ListItemText
      inset={false}
      slotProps={{
        primary: { className: "head" },
        secondary: { component: "div" },
      }}
      primary={
        <>
          <Typography component={titleComponent} variant="h6">
            <Link to={note.fields.slug}>
              {note.frontmatter.title}
            </Link>
          </Typography>
          <Typography variant="overline">{note.frontmatter.date}</Typography>
        </>
      }
      secondary={
        <>
          <TagList>
            {note.frontmatter.tags?.map((tag) => (
              <Typography component="li" variant="subtitle1" key={tag}>
                <TagChip
                  size="medium"
                  variant="outlined"
                  color="secondary"
                  label={`#${tag}`}
                />
              </Typography>
            ))}
          </TagList>
          <Typography component="p" variant="body1" color="text.primary">
            {note.excerpt}
          </Typography>
        </>
      }
    />
  </NoteItemContainer>
);

export default NoteListEntry;
