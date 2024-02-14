import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    authorized({ token }) {
      if (token) {
        console.log('Logged in');
        return true;
      } else return false;
    },
  },
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
