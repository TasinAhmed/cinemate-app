import prisma from '@/libs/prisma';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams.get('searchParams');

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: searchParams,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
    take: 5,
  });

  try {
    return Response.json({ success: true, users });
  } catch (error) {
    return Response.json({ error });
  }
}
