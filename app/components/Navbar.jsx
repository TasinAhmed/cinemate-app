import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const Navbar = ({ user }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div
      className="fixed z-50 flex h-16 w-full items-center justify-between border-b
        border-b-zinc-700 bg-zinc-900 px-4"
    >
      <div
        className="cursor-pointer text-3xl font-black text-white"
        onClick={() => {
          router.push('/');
        }}
      >
        CM
      </div>
      <div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            return (
              e.key === 'Enter' &&
              router.push(`/results?search_query=${searchQuery}`)
            );
          }}
        />
      </div>
      <div className="flex items-center gap-x-4">
        {/* <button
          className="flex h-10 items-center justify-center gap-x-1 rounded-md border border-zinc-700
            px-4 text-white transition-colors hover:bg-zinc-800"
        >
          <MdOutlineAdd fill="white" size={24} />
          <div>Upload</div>
        </button> */}
        <div
          className="avatar cursor-pointer"
          onClick={async () => {
            await signOut();
          }}
        >
          <div className="w-10 rounded-full">
            {user?.image && (
              <img src={user.image} referrerPolicy="no-referrer" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
