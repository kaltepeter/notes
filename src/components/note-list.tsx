import { List } from "@mui/material";
import React from "react";
import { useNoteExcerptList } from "../hooks/use-note-excerpt-list";
import { Note } from "../models/note";
import NoteListEntry from "./note-list-entry";

const NoteList: React.FC = () => {
  const { notes } = useNoteExcerptList();

  return (
    <List>
      {notes
        .filter((note) => (note.node.frontmatter?.title?.length ?? 0) > 0)
        .map(({ node }) => {
          const note = node as unknown as Note;
          return <NoteListEntry key={note.id} note={note} />;
        })}
    </List>
  );
};

export { NoteList };
export default NoteList;
