import React, { ReactElement } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { HeadProps } from "gatsby";

const NotFoundPage = (): ReactElement<typeof Layout> => (
  <Layout>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
export const Head = ({ location }: HeadProps): ReactElement<typeof SEO> => (
  <SEO title="404: Not found" pathname={location.pathname} />
);
