import { GatsbyConfig as OriginalGatsbyConfig } from "gatsby";

export type GatsbyConfig = OriginalGatsbyConfig & {
  siteMetadata: {
    title: string;
    description: string;
    image: string;
    siteUrl: string;
    twitterUsername: string;
  };
};
