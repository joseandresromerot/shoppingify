import { useState, useEffect } from 'react';

export const ResponsiveBreakpoints = {
  MOBILE: 0,
  PHABLET: 550,
  TABLET: 768,
  DESKTOP: 992
};

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};