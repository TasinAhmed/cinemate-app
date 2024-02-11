import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prisma';

interface BodyType {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password }: BodyType = await request.json();
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
