import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          const adminEmail = process.env.ADMIN_EMAIL || 'chef@chiomaokonkwo.com';
          const adminPassword = process.env.ADMIN_PASSWORD || 'chefchioma123';

          // Check for admin credentials
          if (
            credentials.email === adminEmail &&
            credentials.password === adminPassword
          ) {
            // Try to connect to DB and find/create user
            try {
              const connectDB = (await import('@/lib/db/mongoose')).default;
              const User = (await import('@/models/User')).default;
              
              await connectDB();

              let user = await User.findOne({ email: credentials.email });
              
              if (!user) {
                user = await User.create({
                  email: credentials.email,
                  name: 'Chef Chioma',
                  role: 'admin',
                  password: credentials.password,
                });
              }

              return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role,
              };
            } catch (dbError) {
              // If DB fails, still allow admin login with static data
              console.log('DB connection failed, using static admin');
              return {
                id: 'admin-static',
                email: adminEmail,
                name: 'Chef Chioma',
                role: 'admin',
              };
            }
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'chef-chioma-secret-key-change-in-production',
  debug: process.env.NODE_ENV === 'development',
};
