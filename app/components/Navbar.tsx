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
        bg-zinc-950 px-4"
    >
      <div
        className="cursor-pointer text-3xl font-black text-white"
        onClick={() => {
          router.push('/');
        }}
      >
        CM
      </div>
      <div
        className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden
          rounded-full bg-zinc-700"
        onClick={async () => {
          await signOut();
        }}
      >
        {user?.image && <img src={user.image} alt="User profile picture" />}
      </div>
    </div>
  );
};
export default Navbar;
