import { FC, memo, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BtnToTop: FC<{ className?: String }> = ({ className }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 1000) {
      !visible && setVisible(true);
    }
    else if (scrolled <= 300) {
      visible && setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);

    return (() => window.removeEventListener('scroll', toggleVisible));
  }, [visible])

  return (
    <button
      title="Top"
      onClick={scrollToTop}
      className={`hover:text-white fixed rounded-full p-4 bg-gray-700  ${visible ? 'visible' : 'hidden'} ` + className}>
      <FaArrowUp size={20} />
    </button >
  );
};

export default memo(BtnToTop);