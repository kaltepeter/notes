import { useMemo } from "react";
import * as JsSearch from "js-search";
import { useNoteExcerptList } from "./use-note-excerpt-list";
import { Note } from "../models/note";

export const useNoteSearch = (query: string): Note[] => {
  const { notes } = useNoteExcerptList();

  const documents = useMemo(
    () =>
      notes
        .map(({ node }) => node as unknown as Note)
        .filter(
          (note) =>
            typeof note.frontmatter?.title === "string" &&
            note.frontmatter.title.trim() !== "" &&
            typeof note.fields?.slug === "string" &&
            note.fields.slug.trim() !== "",
        ),
    [notes],
  );

  const index = useMemo(() => {
    const search = new JsSearch.Search("id");
    search.addIndex(["frontmatter", "title"]);
    search.addIndex(["frontmatter", "tags"]);
    search.addIndex("excerpt");
    search.addDocuments(documents);
    return search;
  }, [documents]);

  return useMemo(() => {
    if (!query.trim()) return [];
    return index.search(query) as Note[];
  }, [query, index]);
};
