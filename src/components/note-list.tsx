import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "gatsby";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { useNoteExcerptList } from "../hooks/use-note-excerpt-list";
import { Note } from "../models/note";

const useStyles = makeStyles({ name: "NoteList" })((_theme) => ({
  noteListItem: {
    "& .head": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
  },
  noteListItemText: {
    // marginTop: theme.spacing(2),
  },
  chipList: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    padding: _theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    border: "none",
    borderRadius: 0,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NoteListProps {}

const NoteList: React.FC<NoteListProps> = () => {
  const { classes, cx } = useStyles();
  const { notes } = useNoteExcerptList();
  // const {modifiedDate, slug} = pageContext;

  return (
    <List>
      {notes
        .filter((note) => note.node.frontmatter.title.length > 0)
        .map(({ node }) => {
          const note = node as Note;
          return (
            <ListItem
              className={classes.noteListItem}
              key={note.id}
              divider={true}
            >
              <ListItemText
                inset={false}
                primaryTypographyProps={{
                  className: "head",
                }}
                secondaryTypographyProps={{
                  component: "div",
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
                    <Box component="ul" className={classes.chipList}>
                      {note.frontmatter.tags?.map((tag, index) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          key={index}
                        >
                          <Chip
                            size="medium"
                            variant="outlined"
                            component="span"
                            color="secondary"
                            label={`#${tag}`}
                            className={cx(classes.chip)}
                          />
                        </Typography>
                      ))}
                    </Box>
                    <Typography
                      component="p"
                      variant="body1"
                      color="textPrimary"
                      className={classes.noteListItemText}
                    >
                      {note.excerpt}
                    </Typography>
                  </>
                }
              ></ListItemText>
            </ListItem>
          );
        })}
    </List>
  );
};

export { NoteList };
export default NoteList;
