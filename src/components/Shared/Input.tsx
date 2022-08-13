import { useAppDispatch } from '@/hooks/useRedux';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { setScroll } from '@/store/action';

const Input: React.FC<any> = ({ isActive, checkScroll }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(setScroll(0, inputValue.trim()));
      document.getElementById('keyword')?.blur();
      router.push({
        pathname: "/search",
        query: {
          keyword: inputValue.trim()
        },
      });
      // setInputValue(''); //reset form
    }
  };

  return (
    <form
      className={`${isActive ? 'flex' : 'hidden'} lg:flex overflow-hidden h-10 xl:w-[25%] rounded-full`}
      onSubmit={handleFormSubmit}
      id='myForm'
    >
      <button aria-label="Search" type='submit' className={`bg-accent ${checkScroll && 'bg-[#121212]'} flex-shrink-0 flex justify-center items-center w-auto pl-3`}>
        <svg data-v-20f285ec="" data-v-3824af96="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-icon-black dark:text-icon-white text-false icon text-white">
          <path data-v-20f285ec="" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <input
        type="search"
        className={`bg-accent flex-grow text-white outline-none px-3 text-[17px] ${checkScroll && 'bg-[#121212]'}`}
        id='keyword'
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete='off'
      />
    </form>
  );
};

export default Input;