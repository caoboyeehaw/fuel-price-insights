import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDatabase } from '../db';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'

//const id = new ObjectId(userIdAsString);

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
      },

      //auth needd some work
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

        return {id: user._id.toString()}; //user's _id will be saved into JWT
      },
    }),
  ],

  database: process.env.DATABASE_URL,
  session: {
      jwt: true,
  },
  callbacks: {
    jwt: async function (token, user) {
      console.log('jwt callback', token, user);
      if (user) {
        token.id = user.id;
      } else if (token.token && token.token.user) {
        token.id = token.token.user.id;
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
    
});


