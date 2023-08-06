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

        return {id: user._id.toString()}; //user's _id will be saved into JWT cahnges to comment right here for later
      },
    }),
  ],

  database: process.env.DATABASE_URL,
  session: {
      jwt: true,
  },

  callbacks: {
    callbacks: {
      jwt: async function (token, user) {
        console.log('jwt callback', token, user);
        if (user) {
          console.log('User is defined', user);
          token.id = user.id;
        } else if (token.token && token.token.sub) {
          console.log('token.token.sub is defined', token.token.sub);
          token.id = token.token.sub;
        } else {
          console.log('User and token.token.sub are undefined');
        }
        return token;
      },
      session: async function (session, token) {
        console.log('session callback', session, token);
        if (session) {
          session.userId = token.id;
        }
        return session;
      }
    }
  }

});


