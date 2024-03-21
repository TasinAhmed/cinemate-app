import bcrypt from 'bcrypt';
import prisma from '@/libs/prisma';

export async function POST(request) {
  const { email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma?.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ error });
  }
}
