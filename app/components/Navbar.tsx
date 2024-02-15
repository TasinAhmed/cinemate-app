import { type DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';

interface NavbarProps {
  user: DefaultSession['user'];
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <div
      className="flex h-16 w-full items-center justify-between border-b border-b-zinc-700
        bg-batman-black px-4"
    >
      <div className="text-3xl font-black text-white">CM</div>
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
