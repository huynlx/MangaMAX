import { User } from 'firebase/auth';
import { useAppDispatch } from 'hooks/useRedux';
import Link from 'next/link';
import { FaHistory, FaBookmark, FaUserAlt } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { logout } from 'shared/firebase';
import { setScroll } from 'store/action';

const Dropdown: React.FC<{ user: User | null | undefined, className: string }> = ({ user, className }) => {
  const dispatch = useAppDispatch();

  return user ? (
    <div className={`dropdown ${className}`}>
      <img
        title={user.displayName!}
        src={user?.photoURL!}
        className='rounded-full ml-3'
        alt="Photo"
        width={33}
        height={33}
      />
      <div className="dropdown-content rounded-sm">
        <Link href="/recents"><a className='flex items-center space-x-2' onClick={() => dispatch(setScroll(0))}><FaHistory className='inline' /> <span>Recents</span></a></Link>
        <Link href="/bookmarks"><a className='flex items-center space-x-2' onClick={() => dispatch(setScroll(0))}><FaBookmark className='inline' /> <span>Bookmarks</span></a></Link>
        <Link href="/dashboard"><a className='flex items-center space-x-2'><FaUserAlt className='inline' /> <span>Dashboard</span></a></Link>
        <p onClick={logout} className='flex items-center space-x-1'><HiOutlineLogout className='inline' size={20} /> <span>Logout</span></p>
      </div>
    </div>
  ) : (
    <Link href='/login'><a className={`text-md font-semibold ml-3 text-white p-1 px-3 rounded-md bg-red-500 ${className}`}>Login</a></Link>
  )
};

export default Dropdown;