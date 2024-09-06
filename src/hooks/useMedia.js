import { useMediaQuery } from "react-responsive";

export const useMedia = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  return {
    isMobile,
    isTablet,
    isDesktop,
    isRetina,
  };
};
