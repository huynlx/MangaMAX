import { usePosition } from "@/hooks/usePosition";
import { FC, memo, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BtnToTop: FC<{ className?: String }> = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const { handleScrollTo } = usePosition();

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 1000) {
      !visible && setVisible(true);
    }
    else if (scrolled <= 300) {
      visible && setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);

    return (() => window.removeEventListener('scroll', toggleVisible));
  }, [visible])

  return (
    <button
      title="Top"
      onClick={() => handleScrollTo('smooth', 0)}
      className={`hover:text-white fixed rounded-full p-4 bg-gray-700  ${visible ? 'visible' : 'hidden'} ` + className}>
      <FaArrowUp size={20} />
    </button >
  );
};

export default memo(BtnToTop);