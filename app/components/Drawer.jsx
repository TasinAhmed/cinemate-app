import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaHome, FaStar, FaUserFriends } from 'react-icons/fa';
import { MdEvent, MdFavorite, MdMovie } from 'react-icons/md';
import { PiVideoFill } from 'react-icons/pi';

const DrawerItem = ({ icon: Icon, label, image, fill, link }) => {
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
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center">
            <Icon size={28} fill={fill ?? 'white'} />
          </div>
        )}
        {image && (
          <div className="avatar">
            <div className="w-9 rounded-full">
              {image && <img src={image} />}
            </div>
          </div>
        )}
        <div>{label}</div>
      </div>
    </Link>
  );
};

const Drawer = ({ user }) => {
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
