import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDatabase } from '../db';
import bcrypt from 'bcrypt';

export default NextAuth({
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

                return {id: user._id.toString()}; //user's _id will be saved into JWT
            },
        }),
    ],

    database: process.env.DATABASE_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if(user){
              token.id = user._id.toString();     //email is used as id here. Maybe change it to db _id?
            }
            return token;
        },
        async session(session ,token){
            session.userId = token.id;
            return session;
        },
    },
});


