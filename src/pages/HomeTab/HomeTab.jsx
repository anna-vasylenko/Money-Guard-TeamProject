import Currency from "../../components/Currency/Currency";
import { useMedia } from "../../hooks/useMedia";

const HomeTab = () => {
  const { isMobile } = useMedia();
  return <div>{!isMobile && <Currency />}</div>;
};

export default HomeTab;
