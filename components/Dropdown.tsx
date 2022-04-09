import { User } from 'firebase/auth';
import { useAppSelector } from 'hooks/useRedux';
import { memo, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ImSpinner8 } from 'react-icons/im';
import { auth } from 'shared/firebase';

const Dropdown: React.FC<{ user: User | null | undefined, className: string, dataId: string }> = ({ user, className }) => {
  const [userExists, loading] = useAuthState(auth);
  const [spinner, setSpinner] = useState<boolean>(true);
  const { reducer4: { user: setUserDone } } = useAppSelector(state => state);

  useEffect(() => {
    if ((!loading && !userExists) || setUserDone) {
      setSpinner(false);
    }
  }, [setUserDone, userExists, loading])

  return !spinner ?
    user ? (
      <span className={`${className}`}>
        {user?.photoURL ?
          <img
            title={user.displayName!}
            src={user?.photoURL! || '/avatar.jpg'}
            className='w-8 h-8 lg:w-10 lg:h-10 rounded-full ml-3 object-cover'
            alt="Photo" />
          :
          <div className='text-black w-8 h-8 lg:w-10 lg:h-10 rounded-full ml-3 bg-white flex justify-center items-center font-bold'>
            {user.displayName?.slice(0, 1).toUpperCase()}
          </div>}
      </span>
    ) : (
      <span className={`ml-3 text-white p-1 rounded-full bg-accent ${className}`}>
        <svg data-v-20f285ec="" data-v-316b5106="" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-8 lg:h-8 text-icon-black dark:text-icon-white text-false icon" id="avatar">
          <path data-v-20f285ec="" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </span>
    )
    :
    <ImSpinner8 className={`ml-3 w-8 h-8 lg:w-10 lg:h-10 animate-spin ${className}`} />
};

export default memo(Dropdown);