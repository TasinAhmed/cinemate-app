import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/libs/prisma';

export async function GET(req, { params: uid }) {
  console.log(authOptions);
  const session = await getServerSession(authOptions);
  const friends = await prisma.friend.findMany({
    where: {
      requesterId: session.user.id,
      status: 'ACCEPTED',
    },
  });
  console.log(friends);
  return Response.json({ success: true });
}
