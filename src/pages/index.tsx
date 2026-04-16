import { HeadProps } from "gatsby";
import React, { ReactElement } from "react";
import Layout from "../components/layout";
import { NoteList } from "../components/note-list";
import SEO from "../components/seo";

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <NoteList />
    </Layout>
  );
};

export default IndexPage;
export const Head = ({ location }: HeadProps): ReactElement<typeof SEO> => (
  <SEO title="Home" pathname={location.pathname} />
);
