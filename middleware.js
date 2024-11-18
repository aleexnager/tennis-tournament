export { default } from 'next-auth/middleware';

export const config = { matcher: ["/dashboard/:path*", "/tournaments/:path*", "/players/:path*"] };
