import clsx from 'clsx';
import { type DefaultSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { type IconType } from 'react-icons';
import { FaHome, FaStar, FaUserFriends } from 'react-icons/fa';
import { MdEvent, MdFavorite, MdMovie } from 'react-icons/md';
import { PiVideoFill } from 'react-icons/pi';

interface DrawerProps {
  user: DefaultSession['user'];
}

interface DrawerItemProps {
  icon?: IconType;
  label: string | undefined | null;
  image?: string | undefined | null;
  fill?: string;
  link: string;
}

const DrawerItem = ({
  icon: Icon,
  label,
  image,
  fill,
  link,
}: DrawerItemProps) => {
  const pathname = usePathname();

  return (
    <Link href={link}>
      <div
        className={clsx(
          `flex h-full cursor-pointer items-center gap-x-3 rounded-md px-2 text-white
            transition-colors hover:bg-zinc-700`,
          {
            'bg-zinc-950': pathname === link,
          }
        )}
      >
        <div className="flex h-9 w-9 items-center justify-center">
          {Icon && <Icon size={28} fill={fill ?? 'white'} />}
          {image && (
            <Image
              src={image}
              alt="User profile picture"
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </div>
        <div>{label}</div>
      </div>
    </Link>
  );
};

const Drawer = ({ user }: DrawerProps) => {
  return (
    <div
      className="grid h-full w-60 auto-rows-[52px] border-r border-r-zinc-700 bg-zinc-900 px-4
        py-4"
    >
      <DrawerItem image={user?.image} label={user?.name} link="/profile" />
      <DrawerItem icon={FaHome} label={'For You'} fill="#6573ff" link="/" />
      <DrawerItem
        icon={FaUserFriends}
        label={'Friends'}
        fill="#3abafe"
        link="/friends"
      />
      <DrawerItem
        icon={MdMovie}
        label={'Movies'}
        fill="#48cc69"
        link="/movies"
      />
      <DrawerItem
        icon={FaStar}
        label={'Reviews'}
        fill="#ffff00"
        link="/reviews"
      />
      <DrawerItem
        icon={MdFavorite}
        label={'Favorites'}
        fill="#d44bb6"
        link="/favorites"
      />
      <DrawerItem
        icon={PiVideoFill}
        label={'Watch Party'}
        fill="#57d5c6"
        link="/watchparty"
      />
      <DrawerItem
        icon={MdEvent}
        label={'Events'}
        fill="#ed4965"
        link="/events"
      />
    </div>
  );
};
export default Drawer;
