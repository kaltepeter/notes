import { useMemo } from "react";
import * as JsSearch from "js-search";
import { useNoteExcerptList } from "./use-note-excerpt-list";
import { Note } from "../models/note";

export const MIN_QUERY_LENGTH = 3;

export const useNoteSearch = (query: string): Note[] => {
  const { notes } = useNoteExcerptList();
  const isSearchEnabled = query.trim() !== "";

  return useMemo(() => {
    if (!isSearchEnabled) return [];

    const documents = notes
      .map(({ node }) => node as unknown as Note)
      .filter(
        (note) =>
          typeof note.frontmatter?.title === "string" &&
          note.frontmatter.title.trim() !== "" &&
          typeof note.fields?.slug === "string" &&
          note.fields.slug.trim() !== "",
      );

    const search = new JsSearch.Search("id");
    search.addIndex(["frontmatter", "title"]);
    search.addIndex(["frontmatter", "tags"]);
    search.addIndex("excerpt");
    search.addDocuments(documents);

    return search.search(query) as Note[];
  }, [isSearchEnabled, notes, query]);
};
