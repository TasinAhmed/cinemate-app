'use client';

import { useSession } from 'next-auth/react';

const Profile = ({ params: { uid } }) => {
  const session = useSession();

  return <p>{uid === session.data?.user.id ? 'My Profile' : 'Profile'}</p>;
};
export default Profile;
