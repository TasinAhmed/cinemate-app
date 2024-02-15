import { type DefaultSession } from 'next-auth';

interface DrawerProps {
  user: DefaultSession['user'];
}

const DrawerItem = () => {
  return (
    <div
      className="hover: flex cursor-pointer items-center rounded-md px-2 text-white
        transition-colors hover:bg-zinc-700"
    >
      Test
    </div>
  );
};

const Drawer = ({ user }: DrawerProps) => {
  return (
    <div
      className="grid h-full w-60 auto-rows-[52px] border-r border-r-zinc-700 bg-zinc-900 py-4
        pl-4 pr-2"
    >
      <DrawerItem />
      <DrawerItem />
    </div>
  );
};
export default Drawer;
