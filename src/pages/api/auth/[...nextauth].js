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

        // return user's email instead of id
        
        console.log('In authorize callback, user is', user);
        return {id: user._id.toString(), email: user.email};
      },
    }),
  ],

  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },

    callbacks: {
      jwt: async function (token, user) {
        console.log('In jwt callback, token and user are', token, user);
        if (user) {
          token.email = user.email;
          console.log('In jwt callback, after adding email to token, token is', token);
        }
        return token;
      },

      session: async function (session, token) {
        console.log('In session callback, session and token are', session, token);
        if (session) {
          if (token) {
            session.user.email = token.email;
            console.log('In session callback, after adding email to session, session is', session);
          } else {
            console.error('Token is undefined in session callback');
          }
        }
        return session;
    }
    }


});



