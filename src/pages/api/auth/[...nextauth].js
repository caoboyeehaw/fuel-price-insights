import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDatabase } from '../db';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
          throw new Error('Invalid email or password!');
        }

        const db = await getDatabase();
        const clientProfile = db.collection('ClientInfo');

        const user = await clientProfile.findOne({ email });
        if(!user){
          throw new Error('Invalid email or password');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
          throw new Error('Invalid email or password!');
        }

        console.log('In authorize callback, user is', user);
        // Return email as id
        return { email: user.email };
      },
    }),
  ],

  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
    secureCookie: process.env.NODE_ENV === 'production' ? true : false,
  },

  callbacks: {
    jwt: async function (token, user) {
      console.log('In jwt callback, token and user are', token, user);
      if (user) {
        token.email = user.email;
      }
      return token;
    },

    session: async function (session, token) {
      console.log('In session callback, session and token are', session, token);
      if (token && token.email) {
        session.user.email = token.email;
      }
      return session;
    }
  }
});

