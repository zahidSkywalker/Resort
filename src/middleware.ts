import { auth } from '@/auth/config'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.role === 'ADMIN'
  
  if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    return Response.redirect(new URL('/signin', req.nextUrl))
  }
})

export const config = {
  matcher: ['/admin/:path*']
}


