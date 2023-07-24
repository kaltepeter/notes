import { graphql, useStaticQuery } from "gatsby";
import { GatsbyConfig } from "../model";

export const useSiteMetadata = (): GatsbyConfig["siteMetadata"] => {
  const { site } = useStaticQuery(graphql`
    query UseSiteMetadata {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `);

  if (!site?.siteMetadata) {
    throw new Error("Site metadata not found");
  }

  return site?.siteMetadata;
};
