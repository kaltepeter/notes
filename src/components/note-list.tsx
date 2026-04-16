import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "gatsby";
import React from "react";
import { useNoteExcerptList } from "../hooks/use-note-excerpt-list";
import { Note } from "../models/note";

const NoteListItem = styled(ListItem)({
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

const NoteList: React.FC = () => {
  const { notes } = useNoteExcerptList();

  return (
    <List>
      {notes
        .filter((note) => (note.node.frontmatter?.title?.length ?? 0) > 0)
        .map(({ node }) => {
          const note = node as unknown as Note;
          return (
            <NoteListItem key={note.id} divider={true}>
              <ListItemText
                inset={false}
                slotProps={{
                  primary: { className: "head" },
                  secondary: { component: "div" },
                }}
                primary={
                  <>
                    <Typography component="h3" variant="h6">
                      <Link to={note.fields.slug}>
                        {note.frontmatter.title}
                      </Link>
                    </Typography>
                    <Typography variant="overline">
                      {note.frontmatter.date}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <TagList>
                      {note.frontmatter.tags?.map((tag, index) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          key={index}
                        >
                          <TagChip
                            size="medium"
                            variant="outlined"
                            color="secondary"
                            label={`#${tag}`}
                          />
                        </Typography>
                      ))}
                    </TagList>
                    <Typography
                      component="p"
                      variant="body1"
                      color="text.primary"
                    >
                      {note.excerpt}
                    </Typography>
                  </>
                }
              />
            </NoteListItem>
          );
        })}
    </List>
  );
};

export { NoteList };
export default NoteList;
