import { type DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  user: DefaultSession['user'];
}

const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();

  return (
    <div
      className="flex h-16 w-full items-center justify-between border-b border-b-zinc-700
        bg-zinc-900 px-4"
    >
      <div
        className="cursor-pointer text-3xl font-black text-white"
        onClick={() => {
          router.push('/');
        }}
      >
        CM
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
          className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden
            rounded-full bg-zinc-700"
          onClick={async () => {
            await signOut();
          }}
        >
          {user?.image && <img src={user.image} alt="User profile picture" />}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
