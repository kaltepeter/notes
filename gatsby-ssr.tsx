import createEmotionServer from "@emotion/server/create-instance";
import React from "react";
import { CacheProvider } from "@emotion/react";
import { makeMuiCache } from "./src/theme/cache";
import { renderToString } from "react-dom/server";
import { ReplaceRendererArgs } from "gatsby";
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// Notes on MUI 5 and SSR
// https://dev.to/deckstar/gatsby-js-how-to-solve-fouc-when-using-tss-react-and-material-ui-v5-465f

export const replaceRenderer = (args: ReplaceRendererArgs): void => {
  const { bodyComponent, replaceBodyHTMLString, setHeadComponents } = args;

  const muiCache = makeMuiCache();
  const { extractCriticalToChunks } = createEmotionServer(muiCache);

  const emotionStyles = extractCriticalToChunks(
    renderToString(
      <CacheProvider value={muiCache}>{bodyComponent}</CacheProvider>,
    ),
  );

  const muiStyleTags = emotionStyles.styles.map((style) => {
    const { css, key, ids } = style || {};
    return (
      <style
        key={key}
        data-emotion={`${key} ${ids.join(` `)}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });

  setHeadComponents(muiStyleTags);

  // render the result from `extractCritical`
  replaceBodyHTMLString(emotionStyles.html);
};
