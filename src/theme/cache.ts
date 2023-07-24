import createCache from "@emotion/cache";
import { EmotionCache } from "@emotion/react";

export const cacheProps = {
  key: "mui",
  prepend: true,
};

export let muiCache: EmotionCache | undefined;

export const makeMuiCache = (): EmotionCache => {
  if (!muiCache) {
    muiCache = createCache(cacheProps);
  }

  return muiCache;
};
